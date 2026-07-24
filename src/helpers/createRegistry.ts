import { shallowReactive } from 'vue'

export interface RegistryOptions {
  /**
   * 是否使用 `shallowReactive` 存储，使 `computed` / `watch` 能感知注册与注销
   * @defaultValue false
   */
  reactive?: boolean
  /**
   * 同一 id 重复注册时触发，用于告警。不改变「后者接管」的行为
   */
  onDuplicate?: (id: string) => void
}

export interface Registry<T> {
  /**
   * 注册实例，返回注销句柄。
   *
   * 句柄仅在当前值仍是本次注册的值时才删除，因此新旧实例交替期间旧句柄不会误删新注册。
   */
  register: (id: string, value: T) => () => void
  /** 按 id 注销，返回是否确实删除了条目 */
  unregister: (id: string) => boolean
  get: (id: string) => T | undefined
  has: (id: string) => boolean
  /** 已注册的 id 列表，按注册先后排列 */
  keys: () => string[]
  clear: () => void
  readonly size: number
}

/**
 * 创建按 id 索引实例的注册表
 *
 * 适用于跨组件树、跨路由访问实例的场景：组件挂载时注册，卸载时调用 `register`
 * 返回的句柄注销。开启 `reactive` 后可直接在 `computed` 中读取。
 *
 * @category Helpers
 * @typeParam T 注册值的类型
 * @param options 注册表行为配置
 * @returns 注册表实例
 * @example
 * ```ts
 * const registry = createRegistry<MapInstance>()
 *
 * const dispose = registry.register('main', map)
 * registry.get('main') // MapInstance
 * dispose()
 * ```
 * @example
 * ```ts
 * // 响应式模式：跨树门面用 computed 读取，注册与注销都会触发重算
 * const registry = createRegistry<DrawContext>({
 *   reactive: true,
 *   onDuplicate: id => console.warn(`"${id}" 已注册，后者接管`),
 * })
 * const draw = computed(() => registry.get(mapId))
 * ```
 */
export function createRegistry<T>(options?: RegistryOptions): Registry<T> {
  const store = options?.reactive
    ? shallowReactive(new Map<string, T>())
    : new Map<string, T>()

  return {
    register(id, value) {
      if (store.has(id)) options?.onDuplicate?.(id)
      store.set(id, value)
      return () => {
        if (store.get(id) === value) store.delete(id)
      }
    },
    unregister: id => store.delete(id),
    get: id => store.get(id),
    has: id => store.has(id),
    keys: () => [...store.keys()],
    clear: () => store.clear(),
    get size() {
      return store.size
    },
  }
}
