import { string, object, ref, InferType } from 'yup'
import { useForm } from './form'
import { register } from '~/composables/api/auth'

const rules = object({
	email: string().required().email().default(''),
	login: string().required().min(2).max(20).default(''),
	password: string().required().min(6).max(40).default(''),
	repeat_password: string().oneOf([ref('password')]).default('')
})

const errors = {
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
}

declare type Fields = InferType<typeof rules>

declare type InitValues = { [key in keyof Fields]?: Fields[keyof Fields] }

export const useRegistrationForm = (initValues?: InitValues) => {
	return useForm(rules, (fields: Fields) => {
		return register(fields).then(data => {

		})
	}, initValues)
}

// export const useRegistrationForm1 = (initValues?: InitValues) => {
// 	return useForm1(ctx => {
// 		ctx.setRules(rules).setErrors(errors).setData(initValues)

// 		ctx.onSubmitSuccess(data => register(data).then(() => {

// 		}))
// 	})
// }
