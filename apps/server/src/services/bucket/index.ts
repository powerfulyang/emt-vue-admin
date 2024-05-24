import { getExtension } from 'hono/utils/mime'
import type { z } from 'zod'
import { sha1 } from 'hono/utils/crypto'
import { reindex } from '@/services/bucket/reindex'
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
    const hash = await sha1(new Uint8Array(await file.arrayBuffer()))
    if (!hash) {
      throw new Error('Failed to hash file')
    }
    // check if hash is already in db
    const existing = await this.ctx.prisma.asset.findFirst({
      where: {
        hash,
      },
    })
    if (existing) {
      return existing
    }
    const mime = file.type
    const ext = getExtension(mime)
    const name = `${hash}.${ext}`
    const bucket = await this.ctx.prisma.bucket.findFirstOrThrow({
      where: {
        name: this.ctx.env.BUCKET_NAME,
      },
    })
    await this.ctx.prisma.asset.create({
      data: {
        hash,
        name,
        mime,
        bucketId: bucket.id,
      },
    })
    let exif = ''
    if (mime.startsWith('image/')) {
      exif = ''
    }
    // upload to r2
    const uploaded = await this.ctx.env.BUCKET.put(name, file.stream(), {
      customMetadata: {
        mime,
        exif,
      },
      sha1: hash,
    })
    if (!uploaded) {
      throw new Error('Failed to upload file')
    }
    return uploaded
  }

  reindex() {
    return reindex(this.ctx.env)
  }

  async truncate() {
    const r = await this.ctx.env.BUCKET.list()
    const keys = r.objects.map(o => o.key)
    await this.ctx.env.BUCKET.delete(keys)
    const ids = await this.ctx.prisma.asset.findMany().then(assets => assets.map(a => a.id))
    await this.ctx.prisma.asset.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
    return 'truncated'
  }

  async listAssets() {
    return this.ctx.prisma.asset.findMany()
  }
}
