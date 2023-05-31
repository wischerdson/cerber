import { string, object, ref } from 'yup'
import { register } from '~/composables/api/auth'
import { defineForm } from '~/composables/baseForm'

export type RegistrationFormFields = {
	email?: string,
	login?: string,
	password?: string,
	repeat_password?: string,
}

export const useRegistrationForm = (initValues?: RegistrationFormFields) => defineForm({
	initValues,
	rules: object({
		email: string().required().email().default(''),
		login: string().required().min(2).max(20).default(''),
		password: string().required().min(6).max(40).default(''),
		repeat_password: string().oneOf([ref('password')]).default('')
	}),
	errorMessages: {
		email: {
			unique: 'Такой email уже был зарегистрирован',
			required: 'Введите email',
			email: 'Введенный email некорректен'
		},
		login: {
			unique: 'Такой логин уже был зарегистрирован',
			required: 'Придумайте логин',
			min: 'Придумайте логин',
			max: 'Не более 20 символов'
		},
		password: {
			required: 'Придумайте какой-нибудь сложный пароль',
			min: 'Пароль слишком короткий',
			max: 'Пароль слишком длинный'
		},
		repeat_password: {
			oneOf: 'Пароли не совпадают'
		}
	},
	onSuccessSubmiting (data) {
		return register(data)
	}
})
