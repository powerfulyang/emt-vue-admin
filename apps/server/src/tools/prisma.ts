import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'
import type { Bindings } from '@/types'

export function getPrismaInstance(db: Bindings['DB']) {
  const adapter = new PrismaD1(db)
  return new PrismaClient({ adapter })
}
