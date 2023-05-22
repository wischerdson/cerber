import { useState, watch } from '#imports'
import { Ref, WatchStopHandle, toRaw } from 'vue'
import { ValidationError, Schema, InferType } from 'yup'

type UnknownObject = { [key: string]: unknown }

type Errors = { [path: string]: string[] }

declare function TouchField<T>(cb: (fields: T) => unknown, path: string): unknown

declare type FormTools<T> = {
	fields: Ref<T>,
	loading: Ref<boolean>,
	touch: typeof TouchField<T>,
	clean: (key: string) => void,
	hasErrors: (key: string) => boolean,
	doesntHaveErrors: (key: string) => boolean,
	getError: (key: string) => string,
	sendForm: () => void
}

export const useForm = <T extends Schema = Schema<UnknownObject>, S extends InferType<T> = InferType<T>>(
	rules: T,
	readyToSendCb: (fields: S) => Promise<unknown>,
	initValues?: { [key in keyof S]?: S[keyof S] }
): FormTools<S> => {
	const fields = useState(() => rules.cast(initValues))
	const observableFields: { [key: string]: WatchStopHandle } = {}
	const clientErrors = useState<Errors>(() => ({}))
	const loading = useState(() => false)

	const isDirty = (path: keyof typeof observableFields) => path in observableFields

	const validate = (path?: string) => {
		clientErrors.value = {}

		return rules.validate(fields.value, { abortEarly: false }).catch((e: ValidationError) => {
			e.inner.forEach(error => {
				if (error.path && (!path || error.path == path || isDirty(error.path))) {
					clientErrors.value[error.path] = error.errors
				}
			})
		})
	}

	const touch: typeof TouchField<S> = (cb, path) => {
		if (!isDirty(path)) {
			observableFields[path] = watch(() => cb(fields.value), () => validate(path))
		}

		return validate(path)
	}

	const clean = (key: keyof typeof observableFields) => {
		if (isDirty(key)) {
			observableFields[key]()
			delete observableFields[key]
		}
	}

	const hasErrors = (path?: string) => {
		return !!(path ? clientErrors.value[path] : Object.keys(clientErrors.value).length)
	}

	const doesntHaveErrors = (path: string) => !clientErrors.value[path]

	const getError = (path: string) => clientErrors.value[path][0]

	const sendForm = () => validate().then(() => {
		return !hasErrors() ? readyToSendCb(toRaw(fields.value)) : undefined
	})

	return { loading, fields, touch, clean, hasErrors, doesntHaveErrors, getError, sendForm }
}
