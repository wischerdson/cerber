import { useState, watch } from '#imports'
import { Ref, WatchStopHandle, toRaw } from 'vue'
import { ValidationError, Schema, InferType } from 'yup'
import { FetchError } from 'ofetch'

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

export const asd = {}

export const useForm = <T extends Schema = Schema<UnknownObject>, S extends InferType<T> = InferType<T>>(
	rules: T,
	readyToSendCb: (fields: S) => Promise<unknown>,
	initValues?: { [key in keyof S]?: S[keyof S] }
): FormTools<S> => {
	const fields = useState(() => rules.cast(initValues))
	const observableFields: { [key: string]: WatchStopHandle } = {}
	const clientErrors = useState<Errors>(() => ({}))
	const serverErrors = useState<Errors>(() => ({}))
	const loading = useState(() => false)

	const isDirty = (path: keyof typeof observableFields) => path in observableFields

	const clearClientErrors = () => clientErrors.value = {}

	const clearServerErrors = () => serverErrors.value = {}

	const clearServerError = (path?: string) => {
		path ? delete serverErrors.value[path] : clearServerErrors()
	}

	const validate = (path?: string) => {
		clearServerError(path)
		clearClientErrors()

		console.log(asd);


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
		if (path) {
			return path in clientErrors.value
		}

		return !!(path ? clientErrors.value[path] : Object.keys(clientErrors.value).length)
	}

	const doesntHaveErrors = (path?: string) => {
		return !(path ? clientErrors.value[path] : Object.keys(clientErrors.value).length)
	}

	const getError = (path: string) => {
		return clientErrors.value[path][0]
	}

	const handleResponse = (request: Promise<unknown>) => {
		request.catch((e: FetchError) => {
			if ('reason' in e.data && e.data.reason === 'validation_failed') {
				serverErrors.value = e.data.details
			}
		})
	}

	const sendForm = () => validate().then(() => {
		clearServerErrors()

		if (doesntHaveErrors()) {
			handleResponse(readyToSendCb(toRaw(fields.value)))
		}
	})

	return { loading, fields, touch, clean, hasErrors, doesntHaveErrors, getError, sendForm }
}
