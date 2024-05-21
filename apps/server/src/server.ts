import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createContext } from './context'
import { appRouter } from './router'
import type { Bindings } from '@/types'

export default {
  async fetch(request: Request, env: Bindings): Promise<Response> {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext(x) {
        return createContext(x, env)
      },
      allowBatching: true,
    })
  },
}
