<template>
	<div class="layout__account">
		<h1 class="text-4xl mb-4">Account layout</h1>
		<nuxt />
	</div>
</template>

<script>

export default {
	middleware: 'auth',
	head () {
		return {
			bodyAttrs: { style: 'background-color: #0e1116' }
		}
	},
	methods: {
		logout () {
			this.$auth.logout()
		}
	}
}

</script>
