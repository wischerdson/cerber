import { UseFetchOptions, useFetch } from 'nuxt/app'
import { Ref } from 'nuxt/dist/app/compat/capi'
import { getApiBaseUrl } from '~/composables/common'
import { FetchOptions } from 'ofetch'

type Body = Record<string, any> | BodyInit | Ref<Record<string, any> | BodyInit | null | undefined> | null | undefined

export const useApi = (url: string, opt: any) => {
	return $fetch(url, { baseURL: getApiBaseUrl(), ...opt })
}

export const post = <DataT>(url: string, body: Body, opt?: UseFetchOptions<DataT>) => {
	return useApi(url, { method: 'POST', body, ...opt })
}
