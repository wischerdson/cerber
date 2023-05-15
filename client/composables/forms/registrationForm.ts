import { string as str, object, ref, InferType } from 'yup'
import { useForm } from './form'

const rules = object({
	email: str()
		.required('Введите email')
		.email('Введенный email некорректен')
		.default(''),
	login: str()
		.required('Придумайте логин')
		.min(2, 'Придумайте логин')
		.max(20, 'Не более 20 символов')
		.default(''),
	password: str()
		.required('Придумайте какой-нибудь сложный пароль')
		.default(''),
	repeat_password: str()
		.required()
		.oneOf([ref('password')], 'Passwords must match')
		.default('')
})

export const useRegistrationForm = (defaults?: InferType<typeof rules>) => {

	return useForm(rules, defaults)




	// const fields = useState<Fields>(() => rules.cast(defaults))
	// const loading = useState(() => false)
	// const clientErrors = useState<Errors>(() => ({}))
	// const serverErrors = useState<Errors>(() => ({}))
	// const observableFields: { [key: string]: WatchStopHandle } = {}

	// const isDirty = (path: keyof typeof observableFields) => path in observableFields

	// const observe = (path: string) => {
	// 	rules.validate(fields.value, { abortEarly: false }).then(() => {
	// 		clientErrors.value = {}
	// 	}).catch((e: ValidationError) => {
	// 		clientErrors.value = {}

	// 		e.inner.forEach(error => {
	// 			if (error.path && (error.path == path || isDirty(error.path))) {
	// 				clientErrors.value[error.path] = error.errors
	// 			}
	// 		})
	// 	})
	// }

	// const touch: Touch = (cb, path: string) => {
	// 	if (!isDirty(path)) {
	// 		observableFields[path] = watch(() => cb(fields.value), () => observe(path), { immediate: true })
	// 	}

	// 	return observableFields[path]
	// }

	// const clean = (key: keyof typeof observableFields) => {
	// 	if (isDirty(key)) {
	// 		observableFields[key]()
	// 		delete observableFields[key]
	// 	}
	// }

	// const hasErrors = (path: string) => !!clientErrors.value[path]

	// const doesntHaveErrors = (path: string) => !clientErrors.value[path]

	// const getError = (path: string) => clientErrors.value[path][0]

	// return { fields, touch, clean, hasErrors, doesntHaveErrors, getError }
}
