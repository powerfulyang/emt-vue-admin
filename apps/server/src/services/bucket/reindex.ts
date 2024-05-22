import type { Asset } from '@prisma/client'
import { getMimeType } from 'hono/utils/mime'
import { sha1 } from 'hono/utils/crypto'
import { getPrismaInstance } from '@/tools/prisma'
import type { Bindings } from '@/types'

export async function reindex(
  env: Bindings,
) {
  const { BUCKET, DB, BUCKET_NAME } = env
  const prisma = getPrismaInstance(DB)
  // list all objects
  const objs = await BUCKET.list()
  const bucket = await prisma.bucket.findUniqueOrThrow({
    where: {
      name: BUCKET_NAME,
    },
  })
  const bucketId = bucket.id
  // check if object is already indexed
  const indexed = await prisma.asset.findMany({
    where: {
      bucketId,
    },
  })

  const result: Asset[] = []

  // index object if not indexed
  for (const obj of objs.objects) {
    const h = obj.checksums.toJSON().sha1
    let hash = h || ''
    if (!h) {
      const o = await BUCKET.get(obj.key)
      hash = (await sha1(await o!.arrayBuffer()))!
    }
    let mime = obj.customMetadata?.mime || ''
    if (!mime) {
      mime = getMimeType(obj.key) || ''
    }
    if (!indexed.find(i => i.name === obj.key)) {
      const item = await prisma.asset.create({
        data: {
          name: obj.key,
          bucketId,
          mime,
          hash,
        },
      })
      result.push(item)
    }
    else {
      const item = await prisma.asset.findUnique({
        where: {
          hash,
        },
      })
      result.push(item!)
    }
  }

  return result
}
