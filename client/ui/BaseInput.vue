<template>
	<div class="ui-base-input relative pb-5">
		<div class="relative">
			<label
				class="ui-base-input__label"
				:for="id"
			>
				<span>{{ label }}</span>
			</label>

			<slot name="input" :id="id" :value="ownValue" :on-input="onInput" :attrs="attrs" />

			<slot name="default" />

			<div class="pointer-events-none flex items-center px-2 absolute right-0 top-0 bottom-0" v-if="showTickOnSuccess">
				<v-animated-tick :show="success" class="text-emerald-700" />
			</div>
		</div>

		<div class="mt-0.5 leading-none absolute bottom-0 h-5 overflow-hidden flex items-end" v-if="errors">
			<transition name="error" :duration="300">
				<span class="message text-xs font-extralight tracking-wider text-red-500" v-if="error">{{ error }}</span>
			</transition>
		</div>
	</div>
</template>

<script>

	import { keys, omit } from 'lodash'

	export default {
		props: {
			value: [ String, Number ],
			label: { type: String, default: '', required: false },
			forceFilled: { default: false, required: false },
			errors: { type: Object, required: false },
			success: { default: false, required: false },
			showTickOnSuccess: { type: Boolean, default: true, required: false }
		},
		data () {
			return {
				ownValue: this.value,
				id: null
			}
		},
		computed: {
			attrs () {
				return omit(this.$attrs, keys(this._props))
			},
			error () {
				return Object.keys(this.errors).find((item) => this.errors[item]) || null
			}
		},
		watch: {
			value (value) {
				this.ownValue = value
			},
			ownValue (value) {
				this.$emit('input', value)
			}
		},
		methods: {
			onInput (e) {
				this.ownValue = e.target.value
			}
		},
		mounted () {
			this.id = `ui_component_${this.$el.__vue__._uid}`
		}
	}

</script>

<style lang="scss" scoped>

	.error {
		&-enter-active, &-leave-active {
			transition: transform .3s ease;
		}

		&-enter, &-leave-to {
			transform: translateY(-20px);
		}
	}

</style>
