<template>
	<div class="min-h-screen flex items-center sm:items-end justify-center relative">
		<div class="absolute top-0 inset-x-0 flex justify-center mt-10 -z-10">
			<img class="w-32 opacity-30" src="/images/cerberus.png" alt="">
		</div>
		<div class="py-20">
			<div class="w-full max-w-sm py-10 shadow rounded-2xl bg-white sm:bg-transparent sm:shadow-none">
				<h1 class="text-center font-medium text-2xl text-zinc-800">Registration</h1>
				<form class="mx-10 sm:mx-6 mt-10" novalidate @submit.prevent="sendForm">
					<div>
						<label class="text-sm" for="register__email">Email</label>
						<input
							class="form-control w-full mt-1.5"
							id="register__email"
							type="email"
							@change="emailChanged"
							v-model="fields.email"
							autocomplete="off"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
						>
						<div v-if="hasErrors('email')">{{ getError('email') }}</div>
					</div>
					<div class="mt-6">
						<label class="text-sm" for="register__login">Login</label>
						<input
							class="form-control w-full mt-1.5"
							id="register__login"
							type="text"
							autocomplete="off"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
							v-model="fields.login"
							@change="touch(f => f.login, 'login')"
						>
						<div v-if="hasErrors('login')">{{ getError('login') }}</div>
					</div>
					<div class="mt-6">
						<label class="text-sm" for="register__password">Password</label>
						<input
							class="form-control w-full mt-1.5"
							id="register__password"
							type="password"
							v-model="fields.password"
							@change="touch(f => f.password, 'password')"
						>
						<div v-if="hasErrors('password')">{{ getError('password') }}</div>
					</div>
					<div class="mt-6">
						<label class="text-sm" for="register__repeat_password">Repeat password</label>
						<input
							class="form-control w-full mt-1.5"
							id="register__repeat_password"
							type="password"
							v-model="fields.repeat_password"
							@change="touch(f => f.repeat_password, 'repeat_password')"
						>
						<div v-if="hasErrors('repeat_password')">{{ getError('repeat_password') }}</div>
					</div>
					<div class="grid grid-cols-3 mt-6 items-center">
						<NuxtLink class="btn h-auto px-0 text-sm text-zinc-500 hover:text-black justify-self-start" to="/">
							<icon size="18px" name="material-symbols:chevron-left-rounded" />
							<span>Sign in</span>
						</NuxtLink>
						<div class="justify-self-center">
							<button class="btn btn-primary relative" type="submit">
								<span :class="{ 'opacity-0': loading }">Register</span>
								<div class="absolute inset-0 flex items-center justify-center" v-if="loading">
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

import { useHead } from '#imports'
import { useRegistrationForm } from '~/composables/forms/registrationForm'

useHead({
	'title': 'Cerber - Registration'
})

const { fields, loading, touch, getError, hasErrors, doesntHaveErrors, sendForm } = useRegistrationForm()

const emailChanged = () => {
	touch(f => f.email, 'email')

	if (doesntHaveErrors('email')) {
		fields.value.login = fields.value.login || fields.value.email.split('@').shift() || ''
	}
}

</script>
