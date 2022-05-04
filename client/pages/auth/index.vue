<template>
	<div class="py-16">
		<div class="panel w-full max-w-sm mx-auto rounded-xl pb-8">
			<div class="text-center">
				<h1 class="text-center text-3xl text-white font-normal pt-16">Sign In</h1>
				<div class="text-gray-300 font-light mt-6">
					Don't have an account yet?

					<!-- <v-action class="font-medium underline" to="/auth/sign-up">Sign up here</v-action> -->
				</div>
			</div>
			<!-- <sign-in-form class="mt-12" /> -->
		</div>
	</div>
</template>

<script>

import SignInForm from '~/components/forms/auth/sign-in-form'

export default {
	layout: 'auth',
	components: { SignInForm },
	head: {
		title: 'Cerber - Sign in'
	}
}

</script>
