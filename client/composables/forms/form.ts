import { useState, watch } from '#imports'
import { Ref, WatchStopHandle } from 'vue'
import { ValidationError, Schema, InferType } from 'yup'

type UnknownObject = { [key: string]: unknown }

type Errors = { [path: string]: string[] }

declare function TouchField<T>(cb: (fields: T) => unknown, path: string): WatchStopHandle

declare type FormTools<T> = {
	fields: Ref<T>,
	loading: Ref<boolean>,
	touch: typeof TouchField<T>,
	clean: (key: string) => void,
	hasErrors: (key: string) => boolean,
	doesntHaveErrors: (key: string) => boolean,
	getError: (key: string) => string
}

export const useForm = <T extends Schema = Schema<UnknownObject>, S extends InferType<T> = InferType<T>>(
	rules: T,
	initValues?: S
): FormTools<S> => {
	const fields = useState(() => rules.cast(initValues))
	const observableFields: { [key: string]: WatchStopHandle } = {}
	const clientErrors = useState<Errors>(() => ({}))
	const loading = useState(() => false)

	const isDirty = (path: keyof typeof observableFields) => path in observableFields

	const observe = (path: string) => {
		rules.validate(fields.value, { abortEarly: false }).then(() => {
			clientErrors.value = {}
		}).catch((e: ValidationError) => {
			clientErrors.value = {}

			e.inner.forEach(error => {
				if (error.path && (error.path == path || isDirty(error.path))) {
					clientErrors.value[error.path] = error.errors
				}
			})
		})
	}

	const touch: typeof TouchField<S> = (cb, path) => {
		if (!isDirty(path)) {
			observableFields[path] = watch(() => cb(fields.value), () => observe(path), { immediate: true })
		}

		return observableFields[path]
	}

	const clean = (key: keyof typeof observableFields) => {
		if (isDirty(key)) {
			observableFields[key]()
			delete observableFields[key]
		}
	}

	const hasErrors = (path: string) => !!clientErrors.value[path]

	const doesntHaveErrors = (path: string) => !clientErrors.value[path]

	const getError = (path: string) => clientErrors.value[path][0]

	return { loading, fields, touch, clean, hasErrors, doesntHaveErrors, getError }
}
