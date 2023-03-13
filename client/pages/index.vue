<template>
	<Login />
</template>

<script setup>

import { useHead } from '#imports'
import Login from './auth/login.vue'

useHead({
	'title': 'Cerber'
})

</script>
