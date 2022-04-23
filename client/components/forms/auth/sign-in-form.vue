<template>
	<form @submit.prevent="login" novalidate>
		<v-input
			class="mt-10 max-w-xs mx-auto"
			type="email"
			label="Email"
			v-model="fields.login"
			@change="$v.fields.login.$touch"
			:errors="{
				'Пожалуйста, укажите Ваш email': errors.loginRequired,
				'Введите правильный email': errors.loginIsNotEmail,
				'Пользователь не найден': errors.userNotFound
			}"
		/>

		<v-input
			class="mt-10 max-w-xs mx-auto"
			type="password"
			label="Password"
			v-model="fields.password"
			@change="$v.fields.password.$touch"
			:errors="{
				'Пожалуйста, укажите пароль': errors.passwordRequired,
				'Пароль неверный': errors.invalidPassword
			}"
		/>

		<v-action
			class="mt-10 mx-auto block"
			type="submit"
			button
			lighting
			:loading="loading"
		>Войти</v-action>
	</form>
</template>

<script>

import { make } from '~/services/form'
import { signIn } from '~/services/api'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
	layout: 'auth',
	mixins: [ validationMixin ],
	data () {
		return {
			form: make(this),
			loading: false,
			serverErrorResponse: {},
			fields: {
				login: this.$route.query.email || '',
				password: ''
			}
		}
	},
	validations: {
		fields: {
			login: { required, email },
			password: { required }
		}
	},
	computed: {
		errors () {
			return {
				loginRequired: this.$v.fields.login.$error && !this.$v.fields.login.required,
				loginIsNotEmail: this.$v.fields.login.$error && !this.$v.fields.login.email,
				passwordRequired: this.$v.fields.password.$error && !this.$v.fields.password.required,
				invalidPassword: this.form.serverErrorReasonIs('invalid_password'),
				userNotFound: this.form.serverErrorReasonIs('user_not_found')
			}
		}
	},
	methods: {
		login () {
			this.form.send(signIn).then(({ data }) => {
				this.$auth.setUserToken(data)
			})
		}
	},
	mounted () {
		this.fields.user_agent = navigator.userAgent
	}
}

</script>
