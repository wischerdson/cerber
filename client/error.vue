<template>
	<NuxtLayout>
		<div class="container flex items-center justify-center h-[60vh] mt-8 pb-16">
			<Error404 v-if="statusCode == 404" />
			<div v-if="statusCode == 500">
				<DevOnly>
					<p class="text-lg">{{ showError(error) }}</p>
				</DevOnly>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">

import Error404 from '~/components/errors/404.vue'
import { computed, showError } from '#imports'

const props = defineProps<{ error: Object }>()

const statusCode = computed(() => props.error.statusCode)

</script>
