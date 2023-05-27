import { InferType, Schema, ValidationError } from 'yup'
import { useState, useValidation, watch } from '#imports'
import { WatchStopHandle, toRaw } from 'vue'
import { FetchError } from 'ofetch'
import { Errors } from '~/composables/validation'

export const SERVER_VALIDATION_ERROR_REASON = 'validation_failed'

export type MessagesForErrorKeys = { [errorKey: string]: string }

export type ErrorMessages = { [path: string]: MessagesForErrorKeys }

export type FormData = {}

export type InitValues<InferType> = { [key in keyof InferType]?: InferType[keyof InferType] }

export interface DefaultConfig {
	defaultMessagesForErrorKeys: MessagesForErrorKeys,
	errorMessages: ErrorMessages
}

export interface Config<S extends Schema<UnknownObject>, T = InitValues<InferType<S>>> {
	rules: S,
	initValues?: T,
	errorMessages?: ErrorMessages
	onSuccessSubmiting: (formData: T) => Promise<unknown> | void,
}

/**
 * Можно определить в плагине при запуске приложения
 */
export const defaultConfig: DefaultConfig = {
	defaultMessagesForErrorKeys: {},
	errorMessages: {}
}

export const defineForm = <S extends Schema<UnknownObject>>(initConfig: Config<S>) => {
	const cfg = { ...defaultConfig, ...initConfig }
	const formData = useState(() => cfg.rules.cast(cfg.initValues))
	const observableFields: { [key: string]: WatchStopHandle } = {}
	const serverErrors = useState<Errors>(() => ({}))
	const {
		validate,
		getError: getValidationError,
		hasErrors: hasValidationErrors
	} = useValidation(cfg.rules)

	/**
	 * Проверяет отслеживается ли указанное поле для валидации
	 */
	const isDirty = (path: keyof typeof observableFields) => path in observableFields

	/**
	 * Проверяет наличие серверных ошибок, связанных с указанным полем
	 */
	const hasServerErrors = (path: string) => path in serverErrors.value

	/**
	 * Очищает серверные ошибки, связанные с указанным полем
	 */
	const clearServerErrors = (path?: string) => {
		if (!path) {
			return serverErrors.value = {}
		}

		if (hasServerErrors(path)) {
			delete serverErrors.value[path]
		}
	}

	/**
	 * Начинает отслеживать указанное поле для валидации. Во время изменения поля удалятся
	 * связанные с ним ошибки, пришедшие с сервера
	 *
	 * Пример использования: touch(f => f.email, 'email')
	 */
	const touch = (cb: (fields: typeof formData.value) => unknown, path: string) => {
		if (!isDirty(path)) {
			observableFields[path] = watch(
				() => cb(formData.value),
				() => {
					clearServerErrors(path)
					validate(formData.value, path)
				}
			)
		}

		return validate(formData.value, path)
	}

	/**
	 * Отменяет отслеживание указанноего поля и удаляет все ошибки валидации, связанные с ним
	 */
	const clean = (path: keyof typeof observableFields) => {
		if (isDirty(path)) {
			observableFields[path]()
			delete observableFields[path]
		}
	}

	const getErrorByKey = (path: string, errorKey: string) => {
		if (path in cfg.errorMessages && errorKey in cfg.errorMessages[path]) {
			return cfg.errorMessages[path][errorKey]
		}

		if (errorKey in cfg.defaultMessagesForErrorKeys) {
			return cfg.defaultMessagesForErrorKeys[errorKey]
		}

		throw new Error(`Cannot find error message for form path "${path}" by error key "${errorKey}"`)
	}

	/**
	 * Присутствуют ли в форме хоть какие-нибудь ошибки валидации - будь то клиентские или
	 * серверные
	 */
	const hasAnyErrors = (path: string) =>  hasValidationErrors(path) || hasServerErrors(path)

	/**
	 * Возвращает первую найденную у поля ошибку, которая была получена либо в процессе валидации,
	 * либо от сервера
	 */
	const getError = (path: string) => {
		let errorKey = undefined

		if (hasValidationErrors(path)) {
			errorKey = <string>getValidationError(path)
			return getErrorByKey(path, errorKey)
		}

		if (hasServerErrors(path)) {
			errorKey = serverErrors.value[path][0]
		}

		return errorKey ? getErrorByKey(path, errorKey) : undefined
	}

	const handleResponse = (request: Promise<unknown>) => {
		request.catch((e: FetchError) => {
			if ('reason' in e.data && e.data.reason === SERVER_VALIDATION_ERROR_REASON) {
				serverErrors.value = e.data.details
			}
		})
	}

	/**
	 * Прокладка между событием отправки формы и рельной отправкой запроса.
	 * Очищает все серверные ошибки валидации, а также выполняет полную клиентскую валидацию
	 * формы
	 */
	const sendForm = () => validate(formData.value).then(() => {
		clearServerErrors()

		if (!hasValidationErrors()) {
			const maybePromise = cfg.onSuccessSubmiting(toRaw(formData.value))

			if (maybePromise instanceof Promise) {
				handleResponse(maybePromise)
			}
		}
	}).catch((e: ValidationError) => {

	})

	return {
		fields: formData, isDirty, touch, clean, getError, sendForm, hasServerErrors,
		hasValidationErrors, hasAnyErrors
	}
}
