import { defineNuxtPlugin } from 'nuxt/app'
import { addMethod, setLocale, string } from 'yup'

export default defineNuxtPlugin(App => {
	addMethod(string, 'email', function (message) {
		return this.matches(/^\S+@\S+\.\S+$/, {
			message,
			name: 'email',
			excludeEmptyString: true,
		})
	})

	setLocale({
		mixed: {
			required: 'required'
		},
		string: {
			min: 'min'
		}
	})
})
