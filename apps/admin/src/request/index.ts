import ky from 'ky'
import type { Options } from 'ky'
import { stringify } from 'qs'

const instance = ky.create({
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        // 蓝色背景
        console.log(`%c request:  ${request.url}`, 'color: #1890ff; background: #e6f7ff; border: 1px solid #91d5ff')
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // 黄色背景
        console.log(`%c response: ok->${response.ok}`, 'color: #faad14; background: #fffbe6; border: 1px solid #ffe58f')
        return response
      },
    ],
  },
})

interface RequestOptions extends Options {
  responseType?: 'json' | 'text' | 'blob'
  params?: Record<string, string | number>
  data?: Record<string, any>
  showErrorMessage?: boolean
}

export async function request<T>(url: string, options?: RequestOptions): Promise<T> {
  const {
    responseType = 'json',
    params,
    data,
    showErrorMessage = true,
    ...restOptions
  } = options || {}
  const requestUrl = params ? `${url}?${stringify(params)}` : url
  try {
    const response = await instance(requestUrl, {
      json: data,
      ...restOptions,
    })
    if (!response.ok && response.headers.get('content-type')?.includes('application/json')) {
      const json = await response.json<{ error: string }>()
      throw new Error(`${json.error}`)
    }
    if (responseType === 'json') {
      return response.json()
    }
    if (responseType === 'text') {
      return await response.text() as unknown as Promise<T>
    }
    if (responseType === 'blob') {
      return await response.blob() as unknown as Promise<T>
    }
    return response as unknown as Promise<T>
  }
  catch (e) {
    if (showErrorMessage) {
      window.$message.error(e.message)
    }

    // 红色背景
    console.error(`%c request error: ${e.message}`, 'color: #f5222d; background: #fff1f0; border: 1px solid #ffa39e')
    return Promise.reject(e)
  }
}
