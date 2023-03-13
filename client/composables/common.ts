import trim from 'lodash/trim'
import { useRuntimeConfig } from '#imports'

export const storageUrl = (path: string) => {
	return trim(useRuntimeConfig().storageBaseUrl, '/') + '/' + trim(path, '/')
}
