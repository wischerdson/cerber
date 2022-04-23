<template>
	<form @submit.prevent="confirm" novalidate>
		<v-input
			class="mt-10 max-w-xs mx-auto"
			type="number"
			label="Код"
			v-model="fields.code"
			@change="$v.fields.code.$touch"
			:errors="{
				'Пожалуйста, укажите код из письма': errors.codeRequired,
				'Введенный код неверный': errors.codeIsIncorrect
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
import { confirmPasswordResetCode } from '~/services/api'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
	mixins: [ validationMixin ],
	props: {
		email: { type: String, required: false },
		id: { type: String, required: true }
	},
	data () {
		return {
			form: make(this),
			loading: false,
			serverErrorResponse: {},
			fields: {
				code: ''
			}
		}
	},
	validations: {
		fields: { code: { required } }
	},
	computed: {
		errors () {
			return {
				codeRequired: this.$v.fields.code.$error && !this.$v.fields.code.required,
				codeIsIncorrect: this.form.serverErrorReasonIs('invalid_password_reset_code') || this.form.failedServerValidation('code'),
				passwordResetNotFound: this.form.serverErrorReasonIs('password_reset_not_found')
			}
		}
	},
	watch: {
		'errors.passwordResetNotFound' () {
			this.$emit('password-reset-not-found')
		}
	},
	methods: {
		confirm () {
			this.form.send(
				confirmPasswordResetCode,
				{ params: { code: this.fields.code, id: this.id } }
			).then(
				({ data }) => this.$emit('ok', data)
			)
		}
	}
}

</script>
