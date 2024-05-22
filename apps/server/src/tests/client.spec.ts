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

  it('uploadAsset', async () => {
    const formData = new FormData()
    const res = await fetch('https://static.us4ever.com/test-exif.jpg')
    const blob = await res.blob()
    formData.append('asset', blob)
    const result = await proxy.uploadAsset.mutate(formData)
    expect(result).toBeDefined()
  })

  it('reindex', async () => {
    const res = await proxy.reindex.mutate()
    expect(res).toBeDefined()
  })

  it('truncate', async () => {
    const res = await proxy.truncate.mutate()
    expect(res).toBe('truncated')
  })
})
