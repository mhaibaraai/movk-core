import { describe, expect, it, vi } from 'vitest'
import { debounce } from '../src/utils/async/debounce'
import { sleep, sleepWithCancel } from '../src/utils/async/sleep'
import { throttle } from '../src/utils/async/throttle'

describe('异步工具函数', () => {
  describe('sleep', () => {
    it('应该在指定的毫秒数后 resolve', async () => {
      vi.useRealTimers()
      const start = Date.now()
      await sleep(100)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(95)
    })
  })

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
})
