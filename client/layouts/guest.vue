<template>
	<div>
		<div class="fixed top-3 right-3 px-6 py-3 bg-red-50 text-black text-lg border-red-500 border-r-4 sm:left-3 sm:border-t-2 sm:border-r-0 sm:text-center font-light" v-if="$nuxt.isOffline">Нет соединения с интернетом</div>
		<header>Header</header>
		<nuxt />
		<footer>Footer</footer>
	</div>
</template>
