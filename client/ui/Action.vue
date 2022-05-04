<template>
	<component
		:class="[ 'ui-action', appearanceColor, {
			'type-button': button,
			'appearance-lighting': lighting
		} ]"
		:is="component"
		:exact="component == 'nuxt-link' && exact"
		:[linkAttrName]="linkAttrValue"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<div :style="{ opacity: loading ? 0 : 1 }">
			<v-icon class="mr-2" v-if="leftIcon" :name="leftIcon" />
			<slot />
			<v-icon class="ml-2" v-if="rightIcon" :name="rightIcon" />
		</div>
		<div v-if="button && loading" class="loader absolute inset-0 flex items-center justify-center"></div>
	</component>
</template>

<script>

	export default {
		props: {
			href:      { type: String,  required: false, default: null      },
			to:        { type: [String, Object],  required: false, default: null      },
			leftIcon:  { type: String,  required: false, default: null      },
			rightIcon: { type: String,  required: false, default: null      },
			color:     { type: String,  required: false, default: 'primary' },
			lighting:  { type: Boolean, required: false, default: false     },
			disabled:  { type: Boolean, required: false, default: false     },
			button:    { type: Boolean, required: false, default: false     },
			loading:   { type: Boolean, required: false, default: false     },
			exact:     { type: Boolean, required: false, default: true      },
		},
		computed: {
			component () {
				return this.href ? 'a' : (this.to ? 'nuxt-link' : 'button')
			},
			linkAttrName () {
				switch (this.component) {
					case 'a': return 'href';
					case 'nuxt-link': return 'to';
				}

				return null
			},
			linkAttrValue () {
				return this[this.linkAttrName]
			},
			appearanceColor () {
				return this.button ? `appearance-color-${this.color}` : ''
			}
		},
	}

</script>
