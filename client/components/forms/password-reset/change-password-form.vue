<template>
	<form @submit.prevent="changePassword">
		<v-input
			class="mt-10 max-w-xs mx-auto"
			type="password"
			label="Новый пароль"
			v-model="fields.password"
			@change="$v.fields.password.$touch"
			:errors="{
				'Пожалуйста, укажите новый пароль': errors.passwordRequired,
				'Пароль должен иметь минимум 6 символов': errors.passwordTooShort
			}"
		/>

		<v-input
			class="mt-10 max-w-xs mx-auto"
			type="password"
			label="Подтвердить новый пароль"
			v-model="fields.passwordRepeat"
			@change="$v.fields.passwordRepeat.$touch"
			:errors="{
				'Пароли не совпадают': errors.passwordsDontMatch
			}"
		/>

		<v-action
			class="mt-10 mx-auto block"
			type="submit"
			button
			lighting
			:loading="loading"
		>Подтвердить</v-action>
	</form>
</template>

<script>

import { make } from '~/services/form'
import { changePasswordViaReset } from '~/services/api'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
	mixins: [ validationMixin ],
	props: {
		id: { type: String, required: true },
		token: { type: String, required: true }
	},
	data () {
		return {
			form: make(this),
			loading: false,
			serverErrorResponse: {},
			fields: {
				password: '',
				passwordRepeat: ''
			}
		}
	},
	validations: {
		fields: {
			password: { required, minLength: minLength(6) },
			passwordRepeat: { sameAsPassword: sameAs('password') }
		}
	},
	computed: {
		errors () {
			return {
				passwordRequired: this.$v.fields.password.$error && !this.$v.fields.password.required,
				passwordTooShort: this.$v.fields.password.$error && !this.$v.fields.password.minLength,
				passwordsDontMatch: this.$v.fields.passwordRepeat.$error && !this.$v.fields.passwordRepeat.sameAsPassword,
				passwordResetNotFound: this.form.serverErrorReasonIs('password_reset_not_found')
			}
		}
	},
	watch: {
		'errors.passwordResetNotFound' () {
			this.$emit('error-occur')
		}
	},
	methods: {
		changePassword () {
			this.form.send(
				changePasswordViaReset,
				{ id: this.id, token: this.token, password: this.fields.password }
			).then(() => this.$emit('ok', this.fields.password))
		}
	},
	mounted () {
		if (!this.id || !this.token) {
			this.$emit('error-occur')
		}
	}
}

</script>
