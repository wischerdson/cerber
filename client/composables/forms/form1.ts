import { reactive } from '#imports'
import { AnySchema, InferType, Schema, ValidationError } from 'yup'

type UnknownObject = { [key: string]: unknown }

type Rules = Schema<UnknownObject>

type FormState<T extends Schema = , S extends InferType<T> = InferType<T>> = {
	rules?: Rules,
	errors?: { [key in keyof S]: string },
	data?: S,
	onSubmitSuccessCb?: (fields: S) => Promise<unknown>
}

type FormInitializer = (state: FormState) => {

}

type FormContext = {

}

const initNewForm = (state: FormState) => {
	const fields = reactive(() => {})
	const dirtyFields = {}

	const isDirty = (path: string) => path in dirtyFields

	const validate = () => {
		clientErrors.value = {}

		return rules.validate(fields.value, { abortEarly: false }).catch((e: ValidationError) => {
			e.inner.forEach(error => {
				if (error.path && (!path || error.path == path || isDirty(error.path))) {
					clientErrors.value[error.path] = error.errors
				}
			})
		})
	}

	const touch = () => {

	}

	const clear = () => {

	}

	const hasErrors = (path?: string) => {

	}

	const doesntHaveErrors = (path: string) => {

	}

	const getError = (path: string) => {

	}

	const sendForm = () => validate().then(() => {

	})

	return { fields, touch, clear, hasErrors, doesntHaveErrors, getError, sendForm  }
}


export const useForm1 = (initCallback) => {
	const state = {
		rules: null,
		errors: null,
		data: null,
		onSubmitSuccessCb: null
	}

	initCallback({
		setRules (rules: Schema) {
			state.rules = rules
			return this
		},
		setErrorMessages (errors) {
			state.errors = errors
			return this
		},
		setFormData (data) {
			state.data = data
			return this
		},
		onSubmitSuccess (cb) {
			state.onSubmitSuccessCb = cb
		}
	})

	return initNewForm(state)
}
