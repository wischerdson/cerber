import { isValidPhoneNumber } from 'libphonenumber-js'

export const phone = (value) => isValidPhoneNumber(value)
