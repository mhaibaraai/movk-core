import { describe, expect, it, vi } from 'vitest'
import { throttle } from '../../../src/utilities/async'

describe('throttle', () => {
  it('在限制时间内只触发一次函数', () => {
    vi.useFakeTimers()
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    throttled()
    throttled()

    expect(func).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)

    throttled()
    expect(func).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })
})
