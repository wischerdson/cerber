<template>
	<div class="py-16">
		<div class="container max-w-sm">
			<div class="text-center">
				<h1 class="text-center text-3xl text-white font-normal pt-16">Sign Up</h1>
				<div class="text-gray-300 font-light mt-6">
					Already have an account?
					<v-action class="font-medium underline" to="/auth">Sign in here</v-action>
				</div>
			</div>

			<sign-up-form class="mt-12" />
		</div>
	</div>
</template>

<script>

import SignUpForm from '~/components/forms/auth/sign-up-form'

export default {
	layout: 'auth',
	components: { SignUpForm }
}

</script>
