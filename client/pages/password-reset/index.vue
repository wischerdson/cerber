<template>
	<div>
		<h1>Password reset</h1>

		<div class="text-red-500 text-xl text-center" v-if="tooOften">Слишком часто, попробуйте позже</div>

		<password-reset-form @too-often="tooOften = $event" />

		<v-action class="text-blue-500 underline" to="/auth">Вернуться</v-action>
	</div>
</template>

<script>

import PasswordResetForm from '~/components/forms/password-reset/password-reset-form'

export default {
	components: { PasswordResetForm },
	layout: 'auth',
	data () {
		return {
			tooOften: false
		}
	}
}

</script>
