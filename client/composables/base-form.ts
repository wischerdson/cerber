import { InferType, ObjectSchema, ValidationError } from 'yup'
import { useState, useValidation, watch } from '#imports'
import { WatchStopHandle, toRaw } from 'vue'
import { FetchError } from 'ofetch'
import { Errors } from '~/composables/validation'

export const SERVER_VALIDATION_ERROR_REASON = 'validation_failed'

export type AssociatedFields = { [path: string]: () => any }

export type MessagesForErrorKeys = { [errorKey: string]: string }

export type ErrorMessages = { [path: string]: MessagesForErrorKeys }

export type InitValues<InferType> = { [key in keyof InferType]?: InferType[keyof InferType] }

export interface DefaultConfig {
	defaultMessagesForErrorKeys: MessagesForErrorKeys,
	errorMessages: ErrorMessages,
	allowAutoAssociation?: boolean
}

export interface Config<S extends ObjectSchema<UnknownObject>, T = InitValues<InferType<S>>> {
	rules: S,
	initValues?: T,
	errorMessages?: ErrorMessages,
	allowAutoAssociation?: boolean
	onSuccessSubmiting: (formData: T) => Promise<unknown> | void,
	associate?: (fields: T) => AssociatedFields
}

/**
 * Можно определить в плагине при запуске приложения
 */
export const defaultConfig: DefaultConfig = {
	allowAutoAssociation: true,
	defaultMessagesForErrorKeys: {},
	errorMessages: {}
}

export const defineForm = <S extends ObjectSchema<UnknownObject>>(initConfig: Config<S>) => {
	const cfg = { ...defaultConfig, ...initConfig }
	const formData = useState(() => cfg.rules.cast(cfg.initValues))
	const observableFields: { [key: string]: WatchStopHandle } = {}
	const associatedFields: AssociatedFields = {}
	const serverErrors = useState<Errors>(() => ({}))
	const {
		validate,
		getError: getValidationError,
		hasErrors: hasValidationErrors
	} = useValidation(cfg.rules)

	/**
	 * Автоассоциация подходит только для одномерных (неглубоких) форм
	 */
	const autoAssociate = () => {
		Object.keys(cfg.rules.fields).forEach(path => {
			associatedFields[path] = () => formData.value[path]
		})
	}

	/**
	 * Проверяет отслеживается ли указанное поле для валидации
	 */
	const isDirty = (path: string) => path in observableFields

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
	const touch = (path: string, validateImmediately = true) => {
		if(!isDirty(path)) {
			observableFields[path] = watch(associatedFields[path], () => {
				clearServerErrors(path)
				validate(formData.value, Object.keys(observableFields))
			})
		}

		return validateImmediately ? validate(formData.value, Object.keys(observableFields)) : void 0
	}

	/**
	 * Отменяет отслеживание указанноего поля и удаляет все ошибки валидации, связанные с ним
	 */
	const clean = (path: string) => {
		if (isDirty(path)) {
			observableFields[path]()
			delete observableFields[path]
		}
	}

	/**
	 * Получить текст ошибки указанного поля
	 */
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
		if (hasValidationErrors(path)) {
			const errorKey = <string>getValidationError(path)
			return getErrorByKey(path, errorKey)
		}

		if (hasServerErrors(path)) {
			const errorKey = serverErrors.value[path][0]
			return getErrorByKey(path, errorKey)
		}
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
	const sendForm = () => {
		clearServerErrors()

		validate(formData.value, [], true).then(() => {
			if (!hasValidationErrors()) {
				const maybePromise = cfg.onSuccessSubmiting(toRaw(formData.value))

				if (maybePromise instanceof Promise) {
					handleResponse(maybePromise)
				}
			}
		}).catch((e: ValidationError) => {
			e.inner.forEach(error => error.path ? touch(error.path) : void 0)
		})
	}

	if (cfg.allowAutoAssociation) autoAssociate()
	if (cfg.associate) cfg.associate(formData.value)

	return {
		fields: formData, isDirty, touch, clean, getError, sendForm, hasServerErrors,
		hasValidationErrors, hasAnyErrors
	}
}
