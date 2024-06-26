import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { handleAxiosError, handleBackendError, transformRequestData } from './helpers'
import { INVALID_CODE, localStg } from '@/utils'
import type { BackendConfig, ContentType } from '@/utils'

import { useAuthStore } from '@/store'

const controller = new AbortController()

export default class CustomAxiosInstance {
  instance: AxiosInstance

  backendConfig: BackendConfig

  constructor(axiosConfig: AxiosRequestConfig, backendConfig?: Partial<BackendConfig>) {
    const defaultBackendConfig = {
      codeKey: 'code',
      dataKey: 'data',
      messageKey: 'message',
      successCode: 200,
    }
    this.instance = axios.create(axiosConfig)
    this.backendConfig = { ...defaultBackendConfig, ...backendConfig }
    this.setInterceptor()
  }

  setInterceptor() {
    this.instance.interceptors.request.use((config) => {
      if (config.headers) {
        const contentType = config.headers['Content-Type'] as ContentType
        config.headers.Authorization = localStg.get('token') ?? ''
        config.data = transformRequestData(config.data, contentType)
      }
      config.signal = controller.signal
      return config
    })
    this.instance.interceptors.response.use(
      async (response) => {
        const backendResult = response.data
        const { codeKey, dataKey, messageKey, successCode } = this.backendConfig
        const code = backendResult[codeKey]
        const data = backendResult[dataKey]
        const message = backendResult[messageKey]

        // 请求成功
        if (code === successCode) {
          return data
        }
        else if (INVALID_CODE.includes(code)) {
          const error = handleBackendError(code, message)
          const authStore = useAuthStore()
          authStore.logout()
          return Promise.reject(error)
        }
        else {
          const error = handleBackendError(code, message)
          return Promise.reject(error)
        }
      },
      (axiosError: AxiosError) => {
        if (axiosError.response) {
          const { status, data } = axiosError.response
          if (status === 304) {
            return data
          }
          else if (status === 401) {
            controller.abort()
            const authStore = useAuthStore()
            authStore.logout()
          }
        }
        const error = handleAxiosError(axiosError)
        return Promise.reject(error)
      },
    )
  }
}
