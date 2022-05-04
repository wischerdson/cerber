<template>
	<base-input
		:value="value"
		v-bind="$attrs"
		@input="$emit('modelInput', $event)"
	>
		<template v-if="'label' in $scopedSlots" #label="props">
			<slot name="label" v-bind="props" />
		</template>
		<template #input="props">
			<input
				:value="props.value"
				@input="props.onInput"
				:class="props._class"
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
