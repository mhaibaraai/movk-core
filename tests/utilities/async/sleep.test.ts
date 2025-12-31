import { describe, expect, it, vi } from 'vitest'
import { sleep } from '../../../src/utilities/async'

describe('sleep', () => {
  it('应该在指定的毫秒数后 resolve', async () => {
    vi.useRealTimers()
    const start = Date.now()
    await sleep(100)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(95)
  })
})
