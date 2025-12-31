import type { AnyObject } from '../../types/object'

/**
 * 从对象中排除值为undefined的键
 *
 * @category Object
 * @param obj 源对象
 * @returns 排除undefined值后的新对象
 * @example
 * ```ts
 * const data = {
 *   name: 'John',
 *   age: undefined,
 *   city: 'New York',
 *   country: undefined
 * }
 *
 * const cleaned = omitUndefined(data)
 * console.log(cleaned) // { name: 'John', city: 'New York' }
 *
 * // 用于API请求前清理数据
 * const requestData = omitUndefined({
 *   title: 'Post Title',
 *   content: 'Post content',
 *   tags: undefined,
 *   published: true
 * })
 * ```
 */
export function omitUndefined<T extends AnyObject>(
  obj: T,
): Partial<T> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj as Partial<T>
  }

  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>
}
