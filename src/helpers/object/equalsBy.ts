import { toRaw } from 'vue'
import { isObject } from '../../validators/isObject'
import { getPath } from '../path/getPath'

type EqualsByPredicate<T> = (a: T, b: T) => boolean

interface EqualsByOptions<T = unknown> {
  /**
   * 显式等值规则：函数或键路径字符串。
   *
   * - 函数：双方均为对象时直接调用并返回结果，否则视为不等
   * - 字符串：双方均为对象时取路径比对，否则视为不等
   * - **设置即独占**：命中或失败都不会下落到 `keys`
   */
  by?: string | EqualsByPredicate<T>
  /**
   * 启发式回退候选键。仅在未设置 `by` 且双方均为对象时启用。
   *
   * 按顺序遍历，首个「双方均能取到非空非对象的标量」的键即作为比较依据；
   * 取不到可用键则返回 `false`，不做深比较。
   */
  keys?: ReadonlyArray<string | null | undefined>
}

function unwrap<T>(value: T): T {
  return isObject(value) ? (toRaw(value) as T) : value
}

function isUsableScalar(value: unknown): boolean {
  if (value === null || value === undefined) return false
  return typeof value !== 'object'
}

/**
 * 判定两个值是否「等价于同一项」。
 *
 * 比对策略（按优先级）：
 *
 * 1. 引用相等（含原始值快速路径）
 * 2. 任一为 `null`/`undefined`：仅当两者完全相等才视为相同
 * 3. 双方均为对象时先 `toRaw` 解包，再判引用相等（解决 reactive 包装与其 raw 的等价）
 * 4. 若 `options.by` 已设置：函数或路径字符串，命中即独占
 * 5. 否则若 `options.keys` 已设置：顺序遍历候选键，首个可用标量胜出
 * 6. 兜底 `false`，不做结构化深比较
 *
 * @category Object
 * @typeParam T 比较两侧的值类型
 * @param a 比较左侧
 * @param b 比较右侧
 * @param options 比较行为配置（可选）
 * @returns 是否视为同一项
 *
 * @example
 * ```ts
 * // 1) by 字符串路径：业务对象按主键比对
 * equalsBy({ id: 1, name: 'A' }, { id: 1, name: 'B' }, { by: 'id' }) // true
 * equalsBy({ meta: { id: 1 } }, { meta: { id: 2 } }, { by: 'meta.id' }) // false
 * ```
 *
 * @example
 * ```ts
 * // 2) by 函数：自定义复合等值
 * equalsBy(
 *   { tenant: 't1', user: 'u1' },
 *   { tenant: 't1', user: 'u1' },
 *   { by: (a, b) => a.tenant === b.tenant && a.user === b.user },
 * ) // true
 * ```
 *
 * @example
 * ```ts
 * // 3) keys 启发式回退：v-model 中对象与 items 中对象引用不同但语义相同
 * equalsBy(
 *   { label: 'HSL', value: 'hsl' },
 *   { label: 'HSL', value: 'hsl' },
 *   { keys: ['value', 'label'] },
 * ) // true（首个候选 value 即命中）
 * ```
 */
export function equalsBy<T = unknown>(
  a: T,
  b: T,
  options?: EqualsByOptions<T>,
): boolean {
  if (a === b) return true
  if (a == null || b == null) return a === b

  const ra = unwrap(a)
  const rb = unwrap(b)
  if (ra === rb) return true

  const bothObject = isObject(ra) && isObject(rb)

  if (options?.by !== undefined) {
    if (!bothObject) return false
    if (typeof options.by === 'function') {
      return options.by(ra as T, rb as T)
    }
    if (typeof options.by === 'string') {
      return getPath(ra, options.by) === getPath(rb, options.by)
    }
    return false
  }

  if (options?.keys && bothObject) {
    for (const key of options.keys) {
      if (!key) continue
      const va = getPath(ra, key)
      const vb = getPath(rb, key)
      if (!isUsableScalar(va) || !isUsableScalar(vb)) continue
      return va === vb
    }
  }

  return false
}

/**
 * 预绑定配置的 `equalsBy` 工厂。
 *
 * 方便在 `.filter` / `.some` / 去重等回调中复用同一份比较规则。
 *
 * @category Object
 * @typeParam T 比较两侧的值类型
 * @param options 比较行为配置
 * @returns 预配置的二元等值函数
 *
 * @example
 * ```ts
 * const sameUser = createEqualsBy<{ id: number }>({ by: 'id' })
 * users.some(u => sameUser(u, target))
 * ```
 */
export function createEqualsBy<T = unknown>(
  options: EqualsByOptions<T>,
): (a: T, b: T) => boolean {
  return (a, b) => equalsBy(a, b, options)
}
