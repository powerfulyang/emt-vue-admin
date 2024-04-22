import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
// import superjson from 'superjson'

const url = '/trpc'

export const proxy = createTRPCProxyClient({
  links: [
    loggerLink(),
    httpBatchLink({
      url,
      // transformer: superjson,
    }),
  ],
})
