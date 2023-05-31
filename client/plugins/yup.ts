import { defineNuxtPlugin } from 'nuxt/app'
import { addMethod, setLocale, string } from 'yup'

export default defineNuxtPlugin(App => {
	addMethod(string, 'email', function () {
		return this.matches(/^\S+@\S+\.\S+$/, {
			message: 'email',
			name: 'email',
			excludeEmptyString: true,
		})
	})

	setLocale({
		mixed: {
			required: 'required',
			oneOf: 'oneOf'
		},
		string: {
			min: 'min',
			email: 'email'
		}
	})
})
