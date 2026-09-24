/**
 * 纯数据结构化深比较
 *
 * 比较原始值（`Object.is` 语义）、数组与对象的自有可枚举键，不处理 Map/Set/Date 等内建类型。
 * 适用于 options 等纯数据的值判定：模板内联字面量每次渲染都是新引用，值相同应视为未变。
 *
 * @category Object
 * @param a 待比较值
 * @param b 待比较值
 * @returns 结构与值均相同时返回 true
 * @example
 * ```ts
 * isDeepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
 * isDeepEqual({ a: 1 }, { a: 1, b: undefined }) // false
 * ```
 */
export function isDeepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b))
    return true
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null)
    return false
  if (Array.isArray(a) !== Array.isArray(b))
    return false
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length)
    return false
  return keysA.every(key =>
    Object.hasOwn(b, key)
    && isDeepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
  )
}
