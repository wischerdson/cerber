<template>
	<div>
		This is account home page

		<nuxt-link class="text-blue-500" :to="{ name: 'auth.sign-up' }">To sign up page</nuxt-link>
	</div>
</template>

<script>

export default {
	layout: 'account',
	head: {
		title: 'Cerber - Account'
	}
}

</script>
