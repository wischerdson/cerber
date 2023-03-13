<template>
	<div class="min-h-screen">

	</div>
</template>

<script setup>

import { definePageMeta, useHead } from '#imports'

useHead({
	'bodyAttrs': {
		'class': 'bg-zinc-900'
	},
	'title': 'Sneakerdark - магазин одежды, обуви и аксессуаров'
})

definePageMeta({
	header: { absolute: true, appearance: 'dark' }
})


</script>
