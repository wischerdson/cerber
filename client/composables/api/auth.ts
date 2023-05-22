import { RegistrationForm } from "~/types/auth"
import { post } from "./api"

export const register = (form: RegistrationForm) => {
	return post('http://api.localhost/auth/register', form)
}
