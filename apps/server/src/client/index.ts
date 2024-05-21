import { createTRPCClient, httpBatchLink, httpLink, isNonJsonSerializable, splitLink } from '@trpc/client'
import type { AppRouter } from '@/router'

export const proxy = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: op => isNonJsonSerializable(op.input),
      false: httpBatchLink({
        url: 'http://127.0.0.1:8787/trpc',
      }),
      true: httpLink({
        url: 'http://127.0.0.1:8787/trpc',
      }),
    }),
  ],
})
