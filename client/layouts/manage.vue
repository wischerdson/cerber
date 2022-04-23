<template>
	<div>
		<div class="fixed top-3 right-3 px-6 py-3 bg-red-50 text-black text-lg border-red-500 border-r-4 sm:left-3 sm:border-t-2 sm:border-r-0 sm:text-center font-light" v-if="$nuxt.isOffline">Нет соединения с интернетом</div>
		<div>Это layout для личного кабинета клиента</div>
		<div> User logged in: {{ $auth.userLoggedIn }} </div>
		<v-action class="text-blue-500 underline" @click="logout">Выйти</v-action>
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
