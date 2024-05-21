import { describe, expect, it } from 'vitest'
import { proxy } from '@/client'

describe('client', () => {
  it('createBucket', async () => {
    const res = await proxy.createBucket.mutate({
      name: 'static',
      domain: 'static.us4ever.com',
    })
    expect(res?.id).toBeDefined()
  })

  it('reindex', async () => {
    const res = await proxy.reindex.mutate()
    expect(res).toBe('reindexed')
  })
})
