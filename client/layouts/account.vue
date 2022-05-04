<template>
	<div class="layout__account">
		<h1 class="text-4xl mb-4">Account layout</h1>
		<nuxt />
	</div>
</template>

<script>

	export default {
		middleware: 'auth',
		methods: {
			logout () {
				this.$auth.logout()
			}
		}
	}

</script>
