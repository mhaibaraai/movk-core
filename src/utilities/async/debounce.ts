/**
 * 防抖函数，在指定时间内多次触发只执行最后一次
 *
 * @category Async
 * @param func 需要防抖的函数
 * @param wait 防抖延迟时间（毫秒）
 * @returns 防抖处理后的函数
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('搜索:', query)
 * }, 300)
 *
 * // 连续调用，只有最后一次会执行
 * debouncedSearch('a')
 * debouncedSearch('ab')
 * debouncedSearch('abc') // 只有这次会在300ms后执行
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
