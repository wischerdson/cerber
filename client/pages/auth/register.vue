<template>
	<div class="min-h-screen flex items-center sm:items-end justify-center relative">
		<div class="absolute top-0 inset-x-0 flex justify-center mt-10 -z-10">
			<img class="w-32 opacity-30" src="/images/cerberus.png" alt="">
		</div>
		<div class="pt-20">
			<div class="w-full max-w-sm py-10 shadow rounded-2xl bg-white sm:bg-transparent sm:shadow-none">
				<h1 class="text-center font-medium text-2xl text-zinc-800">Registration</h1>
				<form class="mx-10 sm:mx-6 mt-10">
					<div>
						<label class="text-sm" for="register__email">Email</label>
						<input class="form-control w-full mt-1.5" id="register__email" type="text">
					</div>
					<div class="mt-6">
						<label class="text-sm" for="register__login">Login</label>
						<input class="form-control w-full mt-1.5" id="register__login" type="text">
					</div>
					<div class="mt-6">
						<label class="text-sm" for="register__password">Password</label>
						<input class="form-control w-full mt-1.5" id="register__password" type="password">
					</div>
					<div class="mt-6">
						<label class="text-sm" for="register__repeat_password">Repeat password</label>
						<input class="form-control w-full mt-1.5" id="register__repeat_password" type="password">
					</div>
					<div class="grid grid-cols-3 mt-6 items-center">
						<NuxtLink class="btn h-auto px-0 text-sm text-zinc-500 hover:text-black justify-self-start" to="/">
							<icon size="18px" name="material-symbols:chevron-left-rounded" />
							<span>Sign in</span>
						</NuxtLink>
						<div class="justify-self-center">
							<button class="btn btn-primary relative" type="button" @click="s = !s">
								<span :class="{ 'opacity-0': s }">Register</span>
								<div class="absolute inset-0 flex items-center justify-center" v-if="s">
									<icon size="26px" name="svg-spinners:tadpole" />
								</div>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { useHead, ref } from '#imports'

useHead({
	'title': 'Cerber - Registration'
})

const s = ref(false)

</script>
