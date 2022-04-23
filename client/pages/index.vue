<template>
	<div>
		<v-action class="text-blue-500 underline" to="/auth">Аутентификация</v-action>
		<br>
		<v-action class="text-blue-500 underline" to="/manage">Manage</v-action>
	</div>
</template>

<script>

	export default {
		layout: 'guest'
	}

</script>
