<template>
	<transition @enter="enter" name="animated-tick">
		<v-icon stroked class="text-emerald-700" name="done" v-if="show" v-bind="$attrs" />
	</transition>
</template>

<script>

	import Vivus from 'vivus'

	export default {
		props: {
			show: { required: false, default: false }
		},
		methods: {
			enter (el, done) {
				const svg = el.querySelector('svg')

				new Vivus(svg, {
					duration: 20,
					type: 'sync',
					start: 'autostart',
					animTimingFunction: Vivus.EASE
				}, () => done())
			}
		}
	}

</script>

<style lang="scss" scoped>

	.animated-tick {
		&-leave-active {
			transition: opacity .2s ease;
		}

		&-leave-to {
			opacity: 0;
		}
	}

</style>
