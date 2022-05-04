<template>
	<form @submit.prevent="resetPassword" novalidate>
		<v-input
			type="email"
			label="Email"
			v-model="fields.email"
			@change="$v.fields.email.$touch"
			:errors="{
				'Пожалуйста, укажите Ваш email': errors.emailRequired,
				'Введите правильный email': errors.emailIsIncorrect,
				'Пользователь не найден': errors.userNotFound
			}"
		>
			<template #label="props">
				<div class="flex items-center" :class="props._class">
					<label :for="props.for">{{ props.content }}</label>
					<v-action class="ml-auto text-gray-500 font-normal hover:underline" to="/auth">
						<v-icon width="24px" name="chevron-left" />
						<span>Back to sign in</span>
					</v-action>
				</div>
			</template>
		</v-input>

		<v-action
			class="mt-10 w-full"
			type="submit"
			button
			lighting
			:loading="loading"
		>Send code</v-action>
	</form>
</template>

<script>

import { make } from '~/services/form'
import { resetPassword } from '~/services/api'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
	mixins: [ validationMixin ],
	data () {
		return {
			form: make(this),
			loading: false,
			serverErrorResponse: {},
			fields: {
				email: ''
			}
		}
	},
	validations: {
		fields: {
			email: { required, email }
		}
	},
	computed: {
		errors () {
			return {
				emailRequired: this.$v.fields.email.$error && !this.$v.fields.email.required,
				emailIsIncorrect: this.$v.fields.email.$error && !this.$v.fields.email.email,
				userNotFound: this.form.serverErrorReasonIs('user_not_found'),
				tooOften: this.form.serverErrorReasonIs('too_ofter_reset_password')
			}
		}
	},
	watch: {
		'errors.tooOften' (value) {
			this.$emit('too-often', value)
		}
	},
	methods: {
		resetPassword () {
			this.form.send(resetPassword).then(({ data }) => {
				this.$router.push({
					name: 'password-reset-confirmation-id',
					params: { id: data },
					query: { email: this.fields.email }
				})
			})
		}
	}
}

</script>
