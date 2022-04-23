<template>
	<div class="py-16">
		<div class="mobile-container">
			<div class="text-center">
				<v-action to="/">
					<span class="text-6xl font-bold uppercase">Logo</span>
				</v-action>
			</div>

			<sign-in-form />

			<div class="text-center">
				<v-action class="text-blue-500 underline mt-8" to="/password-reset">Восстановить пароль</v-action>
			</div>

			<div class="mt-16 text-center">
				<v-action
					button
					lighting
					color="gray"
					to="/auth/sign-up"
				>Зарегистрироваться</v-action>
			</div>
		</div>
	</div>
</template>

<script>

import SignInForm from '~/components/forms/auth/sign-in-form'

export default {
	components: { SignInForm }
}

</script>
