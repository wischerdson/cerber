<template>
	<div class="py-16">
		<nuxt-link class="text-blue-500" :to="{ name: 'index' }">Back to home</nuxt-link>
		<div class="mobile-container">
			<sign-up-form />
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
