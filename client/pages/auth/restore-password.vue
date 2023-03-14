<template>
	<div class="min-h-screen flex items-center sm:items-end justify-center relative">
		<div class="absolute top-0 inset-x-0 flex justify-center mt-10 -z-10">
			<img class="w-32 opacity-30" src="/images/cerberus.png" alt="">
		</div>
		<div>
			<div class="w-full max-w-sm py-10 shadow rounded-2xl bg-white sm:bg-transparent sm:shadow-none">
				<h1 class="text-center font-medium text-2xl text-zinc-800">Restore password</h1>
				<form class="mx-10 sm:mx-6 mt-10">
					<div>
						<label class="text-sm" for="sign_in__login">Login (or email)</label>
						<input class="form-control w-full mt-1.5" id="sign_in__login" type="text">
					</div>
					<div class="text-center mt-6">
						<button class="btn btn-primary relative" type="button" @click="s = !s">
							<span :class="{ 'opacity-0': s }">Restore</span>
							<div class="absolute inset-0 flex items-center justify-center" v-if="s">
								<icon size="26px" name="svg-spinners:tadpole" />
							</div>
						</button>
					</div>
				</form>
			</div>
			<div class="text-center mt-8 sm:mt-0 sm:mb-8 text-xs text-zinc-500">
				<NuxtLink class="underline hover:no-underline hover:text-black" to="/">Sign in</NuxtLink>
				<span> | </span>
				<NuxtLink class="underline hover:no-underline hover:text-black" to="/auth/register">Register</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { useHead, ref } from '#imports'

useHead({
	'title': 'Cerber - Sign In'
})

const s = ref(false)

</script>
