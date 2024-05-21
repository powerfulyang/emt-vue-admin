import { getExtension } from 'hono/utils/mime'
import type { z } from 'zod'
import { sha1 } from 'hono/utils/crypto'
import type { createBucketInput, uploadAssetInput } from '@/inputs'
import type { getPrismaInstance } from '@/tools/prisma'
import type { Bindings } from '@/types'

export class BucketService {
  constructor(private readonly ctx: {
    env: Bindings
    prisma: ReturnType<typeof getPrismaInstance>
  }) {}

  async createBucket(opts: z.infer<typeof createBucketInput>) {
    return this.ctx.prisma.bucket.create({
      data: opts,
    })
  }

  async uploadAsset(input: z.infer<typeof uploadAssetInput>) {
    const file = input.asset
    const hash = await sha1(file.stream())
    if (!hash) {
      throw new Error('Failed to hash file')
    }
    const mime = file.type
    const ext = getExtension(mime)
    const name = `${hash}.${ext}`
    const bucket = await this.ctx.prisma.bucket.findFirstOrThrow({
      where: {
        name: this.ctx.env.BUCKET_NAME,
      },
    })
    const result = await this.ctx.prisma.asset.create({
      data: {
        hash,
        name,
        mime,
        bucketId: bucket.id,
      },
    })
    // upload to r2
    const uploaded = await this.ctx.env.BUCKET.put(name, file.stream())
    if (!uploaded) {
      throw new Error('Failed to upload file')
    }
    return result
  }
}
