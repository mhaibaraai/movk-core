/**
 * 包装异步函数，使其只执行一次并共享结果
 *
 * 并发调用复用同一个 Promise；成功后结果被缓存，失败时清除缓存以便下次重试。
 * 适用于可选依赖的动态 `import()`、一次性注册等场景。
 *
 * @category Async
 * @typeParam T 结果类型
 * @param fn 待包装的异步函数
 * @returns 返回共享 Promise 的函数
 * @example
 * ```ts
 * const loadPmtiles = onceAsync(() => import('pmtiles'))
 * const [a, b] = await Promise.all([loadPmtiles(), loadPmtiles()]) // 只加载一次
 * ```
 */
export function onceAsync<T>(fn: () => Promise<T>): () => Promise<T> {
  let pending: Promise<T> | undefined
  return () => {
    pending ??= Promise.resolve()
      .then(fn)
      .catch((error: unknown) => {
        pending = undefined
        throw error
      })
    return pending
  }
}
