import { createRequest } from './request'
import { REQUEST_TIMEOUT } from '@/utils'

export const mockRequest = createRequest({ baseURL: '/mock', timeout: REQUEST_TIMEOUT })

export const request = createRequest({
  baseURL: '/',
  timeout: REQUEST_TIMEOUT,
})

export * from './typings'
export * from './constants'
