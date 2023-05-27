import { useState } from 'nuxt/app'
import { InferType, Schema, ValidationError } from 'yup'

export type Errors = { [path: string]: string[] }

export const useValidation = <T extends Schema = Schema<UnknownObject>, S extends InferType<T> = InferType<T>>(
	rules: T
) => {
	const errors = useState<Errors>(() => ({}))

	const hasErrors = (path?: string) => {
		return path ? path in errors.value : !!Object.keys(errors.value).length
	}

	const getAllErrors = (asRaw = false) => asRaw ? errors.value : errors

	const getErrors = (path: string) => path in errors.value ? errors.value[path] : undefined

	const getError = (path: string) => {
		const maybeErrors = getErrors(path)
		return Array.isArray(maybeErrors) ? maybeErrors[0] : undefined
	}

	const clearErrors = () => errors.value = {}

	const clearError = (path?: string) => {
		path && hasErrors(path) ? delete errors.value[path] : clearErrors()
	}

	const validate = (values: S, path?: string) => {
		errors.value = {}

		return rules.validate(values, { abortEarly: false }).catch((e: ValidationError) => {
			e.inner.forEach(error => {
				if (error.path && (!path || error.path == path)) {
					errors.value[error.path] = error.errors
				}
			})
		})
	}

	return { hasErrors, getAllErrors, getErrors, getError, clearErrors, clearError, validate }
}
