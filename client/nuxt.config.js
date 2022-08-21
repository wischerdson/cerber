export default {
	target: 'server',

	vue: {
		config: {
			productionTip: false
		}
	},

	axios: {
		baseURL: process.env.AXIOS_BASE_URL,
		browserBaseURL: process.env.AXIOS_BROWSER_BASE_URL,
		debug: process.env.NODE_ENV !== 'production',
		https: process.env.AXIOS_HTTPS
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		htmlAttrs: {
			lang: 'ru-RU'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0' },
			{ name: 'HandheldFriendly', content: 'True' },
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'format-detection', content: 'address=no' },
			{ name: 'theme-color', content: '#fff' }
		]
	},

	css: [
		'~/assets/sass/ui/_.scss',
		'~/assets/sass/app.scss'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/components.js' },
		{ src: '~/plugins/axios.js' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: false,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxt/postcss8'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://auth.nuxtjs.org/guide
		'@nuxtjs/auth-next'
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extractCSS: true,
		postcss: {
			plugins: {
				// https://tailwindcss.nuxtjs.org/options
				tailwindcss: {
					config: './client/tailwind.config.js',
					// cssPath: resolve(__dirname, 'assets/tailwind.css'),
					exposeConfig: true
				},
				autoprefixer: {},
			},
		},
		extends (config) {
			config.stats = 'errors-warnings'
		}
	},

	server: {
		host: '0.0.0.0'
	},

	watchers: {
		webpack: {
			aggregateTimeout: 300,
			poll: 1000
		}
	},

	auth: {
		localStorage: false,
		resetOnError: true,
		cookie: {
			options: {
				// 2 months
				maxAge: 2 * 30 * 24 * 60 * 60
			}
		},
		redirect: {
			login: '/auth',
			logout: '/',
			callback: '/login',
			home: '/'
		},
		strategies: {
			local: false,
			classic: {
				scheme: 'local',
				url: '/',
				endpoints: {
					user: { url: '/auth/user', method: 'get' },
					logout: { url: '/auth/logout', method: 'delete' }
				},
				user: {
					property: false
				},
				token: {
					// 2 months
					maxAge: 2 * 30 * 24 * 60 * 60
				}
			}
		}
	},

	router: {
		routeNameSplitter: '.'
	}
}
