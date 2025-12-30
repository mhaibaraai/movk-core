import { describe, expect, it, vi } from 'vitest'
import { debounce } from '../../../src/utilities/async'

describe('debounce', () => {
  it('应该在等待时间后只调用一次函数', async () => {
    vi.useFakeTimers()
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    debounced()
    debounced()

    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('应该传递参数给原函数', async () => {
    vi.useFakeTimers()
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced(1, 'a')
    vi.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledWith(1, 'a')
    vi.useRealTimers()
  })
})
