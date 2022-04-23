<template>
	<base-input
		:value="value"
		v-bind="$attrs"
		@input="$emit('modelInput', $event)"
	>
		<template #input="props">
			<input
				:value="props.value"
				@input="props.onInput"
				class="ui-base-input__input"
				:id="props.id"
				v-on="$listeners"
				v-bind="props.attrs"
			>
		</template>
	</base-input>
</template>

<script>

	import BaseInput from './BaseInput'

	export default {
		components: { BaseInput },
		inheritAttrs: false,
		model: {
			event: 'modelInput'
		},
		props: {
			value: [ String, Number ]
		}
	}

</script>
