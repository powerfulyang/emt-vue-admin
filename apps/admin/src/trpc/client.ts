import type { AppRouter } from '@powerfulyang/server'
import { createTRPCClient, httpBatchLink, httpLink, isNonJsonSerializable, splitLink } from '@trpc/client'
import { isProd } from '@/constants'

const prefix = isProd ? 'https://api.us4ever.com' : ''
export const apiUrl = `${prefix}/trpc`

export const proxy = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: op => isNonJsonSerializable(op.input),
      false: httpBatchLink({
        url: apiUrl,
      }),
      true: httpLink({
        url: apiUrl,
      }),
    }),
  ],
})
