import type { AnyObject, OmitByKey } from '../../types'

/**
 * 从对象中排除指定的键，返回新对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要排除的键数组
 * @returns 排除指定键后的新对象
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   password: 'secret',
 *   email: 'john@example.com'
 * }
 *
 * const publicUser = omit(user, ['password'])
 * console.log(publicUser) // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * const basicInfo = omit(user, ['password', 'email'])
 * console.log(basicInfo) // { id: 1, name: 'John' }
 * ```
 */
export function omit<T extends AnyObject, K extends keyof T>(
  obj: T,
  keys: K[],
): OmitByKey<T, K> {
  if (!obj || typeof obj !== 'object') {
    return {} as OmitByKey<T, K>
  }

  const keysSet = new Set(keys)
  const result = {} as OmitByKey<T, K>

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keysSet.has(key as unknown as K)) {
      ;(result as any)[key] = obj[key]
    }
  }

  return result
}

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
