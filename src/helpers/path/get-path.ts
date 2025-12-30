import type { PathInput } from './to-path'
import { toPath } from './to-path'

/**
 * 读取对象指定路径的值。
 *
 * - 若取值结果为 undefined,则返回 defaultValue
 * - 若取值结果为 null,则直接返回 null(不触发默认值)
 * - 传入空路径时返回 object 本身
 *
 * @category Path
 * @param object 源对象
 * @param path 路径字符串或片段数组
 * @param defaultValue 结果为 undefined 时返回的默认值
 * @returns 读取到的值或默认值
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1, d: undefined }, e: null }, arr: [{ x: 9 }] }
 * getPath(obj, 'a.b.c') // 1
 * getPath(obj, 'a.b.d', 42) // 42(d 为 undefined,使用默认值)
 * getPath(obj, 'a.e', 100) // null(null 不触发默认值)
 * getPath(obj, 'arr[0].x') // 9
 * getPath(obj, '') // 返回 obj 本身
 * ```
 */
export function getPath<T, D = undefined>(object: T, path: PathInput, defaultValue?: D): unknown | D {
  const segments = toPath(path)
  if (segments.length === 0)
    return (object as unknown) as D
  let cur: any = object as any
  for (let idx = 0; idx < segments.length; idx++) {
    if (cur == null)
      return defaultValue as D
    const key = segments[idx] as any
    cur = cur[key]
  }
  return cur === undefined ? (defaultValue as D) : cur
}
