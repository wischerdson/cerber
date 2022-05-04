const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./client/ui/**/*.{vue,js}',
		'./client/components/**/*.{vue,js}',
		'./client/layouts/**/*.vue',
		'./client/pages/**/*.vue',
		'./client/nuxt.config.js'
	],
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
				telegram: '#0088cc',
				whatsapp: '#43d854',
				primary: '#306fdb',
			},
			padding: {
				'1/3': '33.333333%',
				'2/3': '66.666667%',
				'1/4': '25%',
				'2/4': '50%',
				'3/4': '75%',
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
				'1/6': '16.666667%',
				'2/6': '33.333333%',
				'3/6': '50%',
				'4/6': '66.666667%',
				'5/6': '83.333333%',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
			},
			maxWidth: {
				'iphone-mini': '320px'
			},
			fontSize: {
				'2xs': ['0.5rem'],
				xs: ['0.75rem'],
				sm: ['0.875rem'],
				base: ['1rem'],
				lg: ['1.125rem'],
				xl: ['1.25rem'],
				'2xl': ['1.5rem'],
				'3xl': ['1.875rem'],
				'4xl': ['2.25rem'],
			},
		},
		fontFamily: {
			sans: 'Roboto, sans-serif',
		},
		screens: {
			'2xl': {'max': '1535px'},
			'xl': {'max': '1279px'},
			'lg': {'max': '1023px'},
			'md': {'max': '767px'},
			'sm': {'max': '639px'},
		}
	},
	plugins: [],
}
