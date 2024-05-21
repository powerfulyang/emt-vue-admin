import { z } from 'zod'

export const createBucketInput = z.object({
  name: z.string(),
  domain: z.string(),
})

export const uploadAssetInput = z.object({
  asset: z.instanceof(File),
})
