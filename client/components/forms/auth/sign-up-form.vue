<template>
	<form @submit.prevent="signUp" novalidate>
		<div class="space-y-4">
			<v-input
				type="email"
				label="Email"
				v-model="fields.email"
				@change="$v.fields.email.$touch"
				:errors="{
					'Enter your email, please': errors.emailRequired,
					'Email is incorrect': errors.emailIsIncorrect,
					'Email already use': errors.emailIsNotUnique
				}"
			/>
			<v-input
				type="password"
				label="Password"
				v-model="fields.password"
				@change="$v.fields.password.$touch"
				:errors="{
					'Пожалуйста, укажите пароль': errors.passwordRequired,
					'Пароль должен иметь минимум 6 символов': errors.passwordTooShort
				}"
			/>
		</div>

		<v-action
			class="mt-10 w-full"
			button
			lighting
			type="submit"
			:loading="loading"
		>Sign up</v-action>
	</form>
</template>

<script>

import { make } from '~/services/form'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { signUp } from '~/services/api'

export default {
	layout: 'auth',
	mixins: [ validationMixin ],
	data () {
		return {
			form: make(this),
			loading: false,
			serverErrorResponse: {},
			fields: {
				email: '',
				password: ''
			}
		}
	},
	validations: {
		fields: {
			email: { required, email },
			password: { required, minLength: minLength(6) }
		}
	},
	computed: {
		errors () {
			return {
				emailRequired: this.$v.fields.email.$error && !this.$v.fields.email.required,
				emailIsIncorrect: this.$v.fields.email.$error && !this.$v.fields.email.email,
				emailIsNotUnique: this.form.failedServerValidation('email', 'unique'),
				passwordRequired: this.$v.fields.password.$error && !this.$v.fields.password.required,
				passwordTooShort: this.$v.fields.password.$error && !this.$v.fields.password.minLength
			}
		}
	},
	methods: {
		signUp () {
			this.form.send(signUp).then(({ data }) => {
				this.$auth.setUserToken(data)
			})
		}
	},
	mounted () {
		this.fields.timezone_offset = (new Date).getTimezoneOffset()
		this.fields.user_agent = navigator.userAgent
	}
}

</script>
