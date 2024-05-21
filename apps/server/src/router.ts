import { initTRPC } from '@trpc/server'
import type { Context } from './context'
import { createBucketInput, uploadAssetInput } from '@/inputs'
import { reindex } from '@/services/bucket/reindex'

export const t = initTRPC
  .context<Context>()
  .create()

export const appRouter = t.router({
  createBucket: t.procedure.input(
    createBucketInput,
  ).mutation((opts) => {
    const input = opts.input
    return opts.ctx.bucketService.createBucket(input)
  }),
  uploadAsset: t.procedure.input(
    uploadAssetInput,
  ).mutation((opts) => {
    const input = opts.input
    return opts.ctx.bucketService.uploadAsset(input)
  }),
  reindex: t.procedure.mutation(async (opts) => {
    return reindex(opts.ctx.env)
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
