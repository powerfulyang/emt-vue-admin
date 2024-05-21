import { createTRPCClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '@/router'

export const proxy = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://127.0.0.1:8787/trpc',
      transformer: superjson,
    }),
  ],
})
