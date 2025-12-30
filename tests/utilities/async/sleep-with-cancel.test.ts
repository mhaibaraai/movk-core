import { describe, expect, it } from 'vitest'
import { sleepWithCancel } from '../../../src/utilities/async'

describe('sleepWithCancel', () => {
  it('应该在指定的毫秒数后 resolve', async () => {
    const { promise } = sleepWithCancel(100)
    const start = Date.now()
    await promise
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(95)
  })

  it('应该可以通过 cancel 函数 reject', async () => {
    const { promise, cancel } = sleepWithCancel(100)
    setTimeout(cancel, 20)
    await expect(promise).rejects.toThrow('Sleep was cancelled')
  })
})
