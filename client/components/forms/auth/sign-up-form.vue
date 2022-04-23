<template>
	<form @submit.prevent="signUp" novalidate>
		<div class="mt-16 max-w-sm mx-auto space-y-4">
			<v-input-phone
				label="Номер телефона"
				v-model="fields.phone"
				@change="$v.fields.phone.$touch"
				:errors="{
					'Пожалуйста, укажите Ваш телефон': errors.phoneRequired,
					'Введите правильный номер': errors.phoneIsIncorrect,
					'Такой номер телефона уже используется': errors.phoneIsNotUnique
				}"
			/>
			<v-input
				type="email"
				label="Email"
				v-model="fields.email"
				@change="$v.fields.email.$touch"
				:errors="{
					'Пожалуйста, укажите Ваш email': errors.emailRequired,
					'Введите правильный email': errors.emailIsIncorrect,
					'Такой email уже используется': errors.emailIsNotUnique
				}"
			/>
			<v-input
				type="password"
				label="Пароль"
				v-model="fields.password"
				@change="$v.fields.password.$touch"
				:errors="{
					'Пожалуйста, укажите пароль': errors.passwordRequired,
					'Пароль должен иметь минимум 6 символов': errors.passwordTooShort
				}"
			/>
		</div>

		<v-action
			class="mt-10 mx-auto block"
			button
			lighting
			type="submit"
			:loading="loading"
		>Зарегистрироваться</v-action>
	</form>
</template>

<script>

import { make } from '~/services/form'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { phone } from '~/services/custom-validators'
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
				phone: '',
				email: '',
				password: ''
			}
		}
	},
	validations: {
		fields: {
			phone: { required, phone },
			email: { required, email },
			password: { required, minLength: minLength(6) }
		}
	},
	computed: {
		errors () {
			return {
				phoneRequired: this.$v.fields.phone.$error && !this.$v.fields.phone.required,
				phoneIsIncorrect: this.$v.fields.phone.$error && !this.$v.fields.phone.phone,
				phoneIsNotUnique: this.form.failedServerValidation('phone', 'unique'),
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
