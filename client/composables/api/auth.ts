import { post } from "./api"
import { RegistrationFormFields } from '~/composables/forms/registrationForm'

export const register = (form: RegistrationFormFields) => {
	return post('http://api.localhost/auth/register', form)
}
