<template>
	<div class="py-16">
		<div class="container max-w-sm">
			<div class="text-center">
				<h1 class="text-center text-3xl text-white font-normal pt-16">Password reset</h1>
				<div class="text-gray-300 font-light mt-6 leading-normal">
					Enter your email address below and we'll get you back on track.
				</div>
				<div class="text-red-500 text-xl text-center" v-if="tooOften">Too often, try again later</div>
			</div>

			<password-reset-form class="mt-12" @too-often="tooOften = $event" />
		</div>
	</div>
</template>

<script>

import PasswordResetForm from '~/components/forms/password-reset/password-reset-form'

export default {
	components: { PasswordResetForm },
	layout: 'auth',
	data () {
		return {
			tooOften: false
		}
	}
}

</script>
