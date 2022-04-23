<template>
	<div class="py-16">
		<div class="mobile-container">
			<div class="text-center">
				<v-action to="/">
					<span class="text-6xl font-bold uppercase">Logo</span>
				</v-action>
			</div>

			<sign-up-form />
		</div>
	</div>
</template>

<script>

import SignUpForm from '~/components/forms/auth/sign-up-form'

export default {
	layout: 'auth',
	components: { SignUpForm }
}

</script>
