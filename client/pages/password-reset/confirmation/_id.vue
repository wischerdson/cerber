<template>
	<div>
		<div class="text-red-500 text-xl text-center" v-if="tooOften">Слишком часто, попробуйте позже</div>
		<div v-if="$fetchState.error || linkIsInvalid">
			Данная ссылка для восстановления пароля недействительна
			<v-action class="text-blue-500 underline" @click="resetPassword">Запросить новый код</v-action>
		</div>

		<div v-else>
			<password-reset-confirmation-form
				:email="email"
				:id="id"
				@password-reset-not-found="linkIsInvalid = true"
				@ok="toPasswordChanging"
			/>
		</div>
	</div>
</template>

<script>

import { getPasswordReset, resetPassword } from '~/services/api'
import PasswordResetConfirmationForm from '~/components/forms/password-reset/password-reset-confirmation-form'

export default {
	components: { PasswordResetConfirmationForm },
	async fetch() {
		const { data } = await getPasswordReset({ params: { id: this.id } })
		this.passwordReset = data
	},
	data () {
		return {
			id: this.$route.params.id,
			email: this.$route.query.email,
			passwordReset: {},
			linkIsInvalid: false,
			tooOften: false
		}
	},
	methods: {
		resetPassword () {
			resetPassword({ email: this.email }).then(({ data }) => {
				this.$router.push({
					name: 'password-reset-confirmation-id',
					params: { id: data },
					query: { email: this.email }
				})
			}).catch(({ response }) => {
				if (response.data.reason == 'too_ofter_reset_password') {
					this.tooOften = true
					return
				}

				this.$router.push('/password-reset')
			})
		},
		toPasswordChanging ({ token }) {
			this.$router.push({
				name: 'password-reset-change-password-id',
				params: { id: this.id },
				query: { email: this.email, token }
			})
		}
	}
}

</script>
