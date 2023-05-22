import { UseFetchOptions, useFetch } from 'nuxt/app'
import { Ref } from 'nuxt/dist/app/compat/capi'
import { getApiBaseUrl } from '~/composables/common'

type Body = Record<string, any> | BodyInit | Ref<Record<string, any> | BodyInit | null | undefined> | null | undefined

export const useApi: typeof useFetch = (url, opt) => {
	return useFetch(url, { baseURL: getApiBaseUrl(), watch: false, ...opt })
}

export const post = <DataT>(url: string, body: Body, opt?: UseFetchOptions<DataT>) => {
	return useApi(url, { method: 'POST', body, ...opt })
}
