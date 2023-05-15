// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	/**
	 * Nuxt collects anonymous telemetry data about general usage. This helps us to
	 * accurately gauge Nuxt feature usage and customization across all our users.
	 *
	 * https://nuxt.com/docs/api/configuration/nuxt-config#telemetry
	 */
	telemetry: true,

	// https://nuxt.com/docs/api/configuration/nuxt-config#components
	components: false,

	// https://nuxt.com/docs/api/configuration/nuxt-config#app
	app: {
		/**
		 * The folder name for the built site assets.
		 *
		 * https://nuxt.com/docs/api/configuration/nuxt-config#buildassetsdir
		 */
		// buildAssetsDir: '/assets/',

		/**
		 * Customize Nuxt root element tag.
		 *
		 * https://nuxt.com/docs/api/configuration/nuxt-config#roottag
		 */
		rootId: 'app'
	},

	runtimeConfig: {
		public: {
			storageBaseUrl: process.env.STORAGE_URL
		}
	},

	/**
	 * Modules are Nuxt extensions which can extend its core functionality and add
	 * endless integrations.
	 *
	 * https://nuxt.com/docs/api/configuration/nuxt-config#modules
	 */
	modules: [
		// https://tailwindcss.nuxt.dev
		'@nuxtjs/tailwindcss',
		// https://nuxt.com/modules/icon
		'nuxt-icon',
		// https://pinia.vuejs.org/ssr/nuxt.html
		['@pinia/nuxt', {
			autoImports: [
				// automatically imports `defineStore`
				'defineStore', // import { defineStore } from 'pinia'
			],
		}]
	],

	tailwindcss: {
		cssPath: '~/assets/sass/ui.scss',
		exposeConfig: true,
	},

	/**
	 * You can define the CSS files/modules/libraries you want to set globally
	 * (included in every page).
	 *
	 * https://nuxt.com/docs/api/configuration/nuxt-config#css
	 */
	css: [
		'~/assets/sass/app.scss',
	],

	/**
	 * Configuration that will be passed directly to Vite.
	 *
	 * https://nuxt.com/docs/api/configuration/nuxt-config#vite
	 */
	vite: {
		logLevel: 'warn'
	},

	imports: {
		// https://nuxt.com/docs/guide/concepts/auto-imports#disable-auto-imports
		autoImport: false
	}
})
