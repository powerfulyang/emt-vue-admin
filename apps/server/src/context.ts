import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { BucketService } from '@/services/bucket'
import { getPrismaInstance } from '@/tools/prisma'
import type { Bindings } from '@/types'

export function createContext(
  ctx: FetchCreateContextFnOptions,
  env: Bindings,
) {
  const prisma = getPrismaInstance(env.DB)
  const bucketService = new BucketService({ env, prisma })
  ctx.resHeaders.set('Access-Control-Allow-Origin', '*')
  return {
    ...ctx,
    env,
    prisma,
    bucketService,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
