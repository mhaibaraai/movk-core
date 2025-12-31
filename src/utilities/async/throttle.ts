/**
 * 节流函数，在指定时间内多次触发只执行第一次
 *
 * @category Async
 * @param func 需要节流的函数
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流处理后的函数
 * @example
 * ```ts
 * const throttledScroll = throttle((event: Event) => {
 *   console.log('滚动事件处理')
 * }, 100)
 *
 * // 监听滚动事件，每100ms最多执行一次
 * window.addEventListener('scroll', throttledScroll)
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
