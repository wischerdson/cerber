<template>
	<DevOnly>
		<teleport to="body">
			<div class="fixed bottom-1 left-1 text-white bg-gray-900 py-1 px-1.5 text-xs leading-none rounded-md z-50 font-mono">
				<span class="xl:hidden">2xl</span>
				<span class="hidden xl:inline lg:hidden">xl</span>
				<span class="hidden lg:inline md:hidden">lg</span>
				<span class="hidden md:inline sm:hidden">md</span>
				<span class="hidden sm:inline">sm</span>
			</div>
		</teleport>
	</DevOnly>

	<slot></slot>
</template>

<script setup lang="ts">

import { useHead } from '#imports'

useHead({
	'bodyAttrs': {
		'class': 'bg-slate-50'
	}
})

</script>
