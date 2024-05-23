import { initTRPC } from '@trpc/server'
import type { Context } from '@/context'
import { createBucketInput, uploadAssetInput } from '@/inputs'

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
  listAssets: t.procedure.query(async (opts) => {
    return opts.ctx.bucketService.listAssets()
  }),
  uploadAsset: t.procedure.input(
    uploadAssetInput,
  ).mutation((opts) => {
    const input = opts.input
    return opts.ctx.bucketService.uploadAsset(input)
  }),
  reindex: t.procedure.mutation(async (opts) => {
    return opts.ctx.bucketService.reindex()
  }),
  truncate: t.procedure.mutation(async (opts) => {
    return opts.ctx.bucketService.truncate()
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
