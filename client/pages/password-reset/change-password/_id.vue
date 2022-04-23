<template>
	<div>
		<change-password-form :email="email" :id="id" :token="token" @error-occur="redirect" @ok="trySignIn" />
	</div>
</template>

<script>

import ChangePasswordForm from '~/components/forms/password-reset/change-password-form'
import { signIn } from '~/services/api'

export default {
	components: { ChangePasswordForm },
	data () {
		return {
			id: this.$route.params.id,
			token: this.$route.query.token,
			email: this.$route.query.email
		}
	},
	methods: {
		redirect () {
			this.$router.push({
				name: 'password-reset-confirmation-id',
				params: { id: this.id },
				query: { email: this.email }
			})
		},
		trySignIn (password) {
			signIn({ login: this.email, password, user_agent: navigator.userAgent })
				.then(({ data }) => this.$auth.setUserToken(data))
				.catch(
					() => this.$router.push({
						name: 'auth',
						query: { email: this.email }
					})
				)
		}
	}
}

</script>
