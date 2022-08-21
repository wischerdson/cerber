<template>
	<div class="layout__auth">
		<nuxt />
	</div>
</template>

<script>

export default {
	middleware ({ $auth, redirect }) {
		if ($auth.loggedIn) {
			redirect(302, '/')
		}
	},
	head () {
		return {
			bodyAttrs: { style: 'background-color: #0e1116' }
		}
	}
}

</script>
