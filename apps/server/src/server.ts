import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createContext } from './context'
import { appRouter } from './router'
import type { Bindings } from '@/types'

export default {
  async fetch(request: Request, env: Bindings): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }
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
