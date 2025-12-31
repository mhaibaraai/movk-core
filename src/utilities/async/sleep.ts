/**
 * 延迟执行函数，返回一个在指定时间后resolve的Promise
 *
 * @category Async
 * @param ms 延迟时间（毫秒）
 * @returns 延迟Promise
 * @example
 * ```ts
 * // 延迟1秒后继续执行
 * await sleep(1000)
 * console.log('1秒后执行')
 *
 * // 在异步函数中使用
 * async function delayedOperation() {
 *   console.log('开始')
 *   await sleep(500)
 *   console.log('500ms后执行')
 * }
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
