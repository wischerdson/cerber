<template>
	<span
		class="icon inline-block"
		:class="`icon-${name}`"
		v-html="require(`!!raw-loader!~/assets/svg${stroked ? '/stroked' : ''}/${name}.svg`).default"
	></span>
</template>

<script>

	export default {
		name: 'icon',
		props: {
			name: { type: String, required: false },
			width: String,
			height: String,
			stroked: { type: Boolean, default: false, required: false }
		},
		mounted () {
			const svg = this.$el.querySelector('svg')
			svg.style.width = this.width || this.height || svg.style.width
			svg.style.height = this.height || this.width || svg.style.height
		}
	}

</script>
