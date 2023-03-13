<template>
	<div class="min-h-screen flex items-center sm:items-end justify-center relative">
		<div class="absolute top-0 inset-x-0 flex justify-center mt-10 -z-10">
			<img class="w-32 opacity-30" src="/images/cerberus.png" alt="">
		</div>
		<div class="w-full max-w-sm py-10 shadow rounded-2xl bg-white sm:bg-transparent sm:shadow-none">
			<h1 class="text-center font-medium text-2xl text-zinc-800">Sign in</h1>
			<form class="mx-10 sm:mx-6 mt-10">
				<div>
					<label for="sign_in__email">Login (or email)</label>
					<input class="form-control w-full mt-1.5" id="sign_in__email" type="text">
				</div>
				<div class="mt-6">
					<label for="sign_in__password">Password</label>
					<input class="form-control w-full mt-1.5" id="sign_in__password" type="password">
				</div>
				<div class="text-center mt-6">
					<button class="btn flex-col h-auto" type="button" @click="s = !s">
						<div class="w-10 h-10 border border-zinc-500 text-zinc-500 rounded-full flex items-center justify-center">
							<icon v-if="s" size="26px" name="svg-spinners:tadpole" />
							<icon v-else size="32px" name="material-symbols:arrow-right-alt-rounded" />
						</div>
						<span class="mt-2 font-medium text-zinc-500">Sign in</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">

import { useHead, ref } from '#imports'
import Cerber from '~/assets/svg/cerberus.svg?component'

useHead({
	'title': 'Cerber - Sign In'
})

const s = ref(false)

</script>
