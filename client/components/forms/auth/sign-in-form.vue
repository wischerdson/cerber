<template>
	<form @submit.prevent="login" novalidate>
		<v-input
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
			class="mt-4"
			type="password"
			label="Password"
			v-model="fields.password"
			@change="$v.fields.password.$touch"
			:errors="{
				'Пожалуйста, укажите пароль': errors.passwordRequired,
				'Пароль неверный': errors.invalidPassword
			}"
		>
			<template #label="props">
				<div :class="['flex items-center', ...props._class]">
					<label :for="props.for">{{ props.content }}</label>
					<v-action class="ml-auto text-gray-500 font-normal hover:underline" to="/password-reset">Forgot password?</v-action>
				</div>
			</template>
		</v-input>

		<v-action
			class="w-full mt-10"
			type="submit"
			button
			lighting
			:loading="loading"
		>Sign in</v-action>
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
