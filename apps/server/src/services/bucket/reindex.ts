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

  // index object if not indexed
  for (const obj of objs.objects) {
    if (!indexed.find(i => i.name === obj.key)) {
      await prisma.asset.create({
        data: {
          name: obj.key,
          bucketId,
        },
      })
    }
  }
}
