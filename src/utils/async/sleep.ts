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

/**
 * 可取消的延迟函数，返回Promise和取消函数
 *
 * @category Async
 * @param ms 延迟时间（毫秒）
 * @returns 包含Promise和取消函数的对象
 * @example
 * ```ts
 * const { promise, cancel } = sleepWithCancel(5000)
 *
 * // 在另一个地方取消延迟
 * setTimeout(() => {
 *   cancel() // 取消延迟
 * }, 2000)
 *
 * try {
 *   await promise
 *   console.log('5秒后执行')
 * } catch (error) {
 *   console.log('延迟被取消')
 * }
 * ```
 */
export function sleepWithCancel(ms: number): {
  promise: Promise<void>
  cancel: () => void
} {
  let timeoutId: NodeJS.Timeout
  let rejectFn: (reason?: any) => void

  const promise = new Promise<void>((resolve, reject) => {
    rejectFn = reject
    timeoutId = setTimeout(resolve, ms)
  })

  const cancel = () => {
    clearTimeout(timeoutId)
    rejectFn(new Error('Sleep was cancelled'))
  }

  return { promise, cancel }
}
