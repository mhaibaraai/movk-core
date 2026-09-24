import { describe, expect, it, vi } from 'vitest'
import { onceAsync } from '../../../src/utilities/async'

describe('onceAsync', () => {
  it('并发调用共享同一个 Promise，fn 只执行一次', async () => {
    const fn = vi.fn(async () => 42)
    const load = onceAsync(fn)
    const [a, b] = await Promise.all([load(), load()])
    expect(a).toBe(42)
    expect(b).toBe(42)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('成功后后续调用直接复用结果', async () => {
    const fn = vi.fn(async () => ({}))
    const load = onceAsync(fn)
    const first = await load()
    expect(await load()).toBe(first)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('失败后清除缓存，下次调用重试', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce('ok')
    const load = onceAsync(fn as () => Promise<string>)
    await expect(load()).rejects.toThrow('boom')
    await expect(load()).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('同步抛错同样以 reject 返回并允许重试', async () => {
    let calls = 0
    const load = onceAsync(async () => {
      calls++
      if (calls === 1) throw new Error('sync')
      return calls
    })
    await expect(load()).rejects.toThrow('sync')
    await expect(load()).resolves.toBe(2)
  })
})
