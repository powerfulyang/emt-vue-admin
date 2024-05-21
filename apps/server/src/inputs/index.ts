import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const createBucketInput = z.object({
  name: z.string(),
  domain: z.string(),
})

export const uploadAssetInput = zfd.formData({
  asset: zfd.file(),
})
