/**
 * 定义挂在 `globalThis` 上的跨副本单例
 *
 * 以 `Symbol.for(key)` 为键存取：同一依赖被多个构建产物各自打包（如 Nuxt 与 Vite 双构建）时，
 * 各副本仍共享同一份状态。首次调用执行 `factory`，此后直接返回已有实例。
 *
 * @category Helpers
 * @typeParam T 单例值的类型
 * @param key 全局唯一键，建议带包名前缀
 * @param factory 首次调用时创建实例的工厂
 * @returns 单例实例
 * @example
 * ```ts
 * const config = defineGlobalSingleton('my-lib:config', () => ({ token: '' }))
 * ```
 */
export function defineGlobalSingleton<T>(key: string, factory: () => T): T {
  const store = globalThis as Record<symbol, unknown>
  const symbol = Symbol.for(key)
  if (!(symbol in store))
    store[symbol] = factory()
  return store[symbol] as T
}
