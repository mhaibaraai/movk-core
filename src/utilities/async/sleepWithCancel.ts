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
