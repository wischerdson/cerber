<template>
	<div class="min-h-screen flex items-center sm:items-end justify-center relative">
		<div class="absolute top-0 inset-x-0 flex justify-center mt-10 -z-10">
			<img class="w-32 opacity-30" src="/images/cerberus_4x.webp" alt="">
		</div>
		<div>
			<div class="w-full max-w-sm py-10 shadow rounded-2xl bg-white sm:bg-transparent sm:shadow-none">
				<h1 class="text-center font-medium text-2xl text-zinc-800">Sign in</h1>
				<form class="mx-10 sm:mx-6 mt-10" @submit.prevent="sendForm">
					<div>
						<label class="text-sm" for="sign_in__login">Login (or email)</label>
						<input
							class="form-control w-full mt-1.5"
							id="sign_in__login"
							type="text"
							@change="touch('login')"
							autocomplete="off"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
							v-model="fields.login"
						>
						<div v-if="hasAnyErrors('login')">{{ getError('login') }}</div>
					</div>
					<div class="mt-6">
						<label class="text-sm" for="sign_in__password">Password</label>
						<input
							class="form-control w-full mt-1.5"
							id="sign_in__password"
							type="password"
							@change="touch('password')"
							v-model="fields.password"
						>
						<div v-if="hasAnyErrors('password')">{{ getError('password') }}</div>
					</div>
					<div class="text-center mt-6">
						<button class="btn flex-col h-auto" type="submit">
							<div class="w-10 h-10 border border-zinc-500 text-zinc-500 rounded-full flex items-center justify-center">
								<!-- <icon v-if="s" size="26px" name="svg-spinners:tadpole" /> -->
								<icon size="32px" name="material-symbols:arrow-right-alt-rounded" />
							</div>
							<span class="mt-2 font-medium text-zinc-500">Sign in</span>
						</button>
					</div>
				</form>
			</div>
			<div class="text-center mt-8 sm:mt-0 sm:mb-8 text-xs text-zinc-500">
				<NuxtLink class="underline hover:no-underline hover:text-black" to="/auth/restore-password">Restore password</NuxtLink>
				<span> | </span>
				<NuxtLink class="underline hover:no-underline hover:text-black" to="/auth/register">Register</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { useHead, ref, defineForm } from '#imports'
import { object, string } from 'yup';

useHead({
	'title': 'Cerber - Sign In'
})

const { fields, hasAnyErrors, getError, touch, sendForm } = defineForm({
	rules: object({
		login: string().required().min(2).default(''),
		password: string().required().default('')
	}),
	errorMessages: {
		login: {
			required: 'Требуется указать логин',
			min: 'Логин слишком короткий'
		},
		password: { required: 'Требуется ввести пароль' }
	},
	associate: f => ({
		login: () => f.login,
		password: () => f.password
	}),
	onSuccessSubmiting () {

	},
})

</script>
