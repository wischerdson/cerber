import { isNull } from 'lodash'

class Form
{
	constructor (context) {
		this.context = context
		this.sentAtLeastOnce = false
	}

	serverErrorReasonIs (reason) {
		return this.serverErrorReason() == reason
	}

	getViaContext (callback) {
		if (this.context) {
			return callback(this.context)
		}
	}

	hasServerError () {
		return this.sentAtLeastOnce && !isNull(this.context.serverErrorResponse)
	}

	serverErrorReason () {
		return this.hasServerError() ? this.context.serverErrorResponse.data.reason : null
	}

	errorDetails () {
		return this.hasServerError() ? this.context.serverErrorResponse.data.details : null
	}

	failedServerValidation (field, validationRule = null) {
		const check = this.serverErrorReasonIs('validation_failed') && field in this.errorDetails()

		if (validationRule) {
			return check && this.errorDetails()[field].includes(validationRule)
		}

		return check
	}

	send (transport, customConfig = null) {
		this.context.serverErrorResponse = null

		if ('$v' in this.context) {
			this.context.$v.$touch()

			if (this.context.$v.$error) {
				return new Promise(() => {})
			}
		}

		this.sentAtLeastOnce = true
		this.context.loading = true

		const sending = transport(customConfig || this.context.fields)

		sending.catch(({ response }) => {
			this.context.serverErrorResponse = response
		}).finally(() => this.context.loading = false)

		return sending
	}
}

export const make = (...args) => new Form(...args)
