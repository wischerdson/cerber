import { string, object, ref, InferType } from 'yup'
import { useForm } from './form'
import { register } from '~/composables/api/auth'

const rules = object({
	email: string()
		.required('Введите email')
		.email('Введенный email некорректен')
		.default(''),
	login: string()
		.required('Придумайте логин')
		.min(2, 'Придумайте логин')
		.max(20, 'Не более 20 символов')
		.default(''),
	password: string()
		.required('Придумайте какой-нибудь сложный пароль')
		.min(6, 'Пароль слишком короткий')
		.max(40, 'Пароль слишком длинный')
		.default(''),
	repeat_password: string()
		.oneOf([ref('password')], 'Пароли не совпадают')
		.default('')
})

declare type Fields = InferType<typeof rules>

declare type InitValues = { [key in keyof Fields]?: Fields[keyof Fields] }

export const useRegistrationForm = (initValues?: InitValues) => {
	return useForm(rules, (fields: Fields) => {
		return register(fields).then(data => {

		})
	}, initValues)
}
