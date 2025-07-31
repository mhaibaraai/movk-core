import type { AnyObject, PickByKey } from '../../types'

/**
 * 从对象中选择指定的键，返回新对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要选择的键数组
 * @returns 只包含指定键的新对象
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret',
 *   createdAt: '2023-01-01',
 *   updatedAt: '2023-01-15'
 * }
 *
 * const publicInfo = pick(user, ['id', 'name', 'email'])
 * console.log(publicInfo) // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * const basicInfo = pick(user, ['id', 'name'])
 * console.log(basicInfo) // { id: 1, name: 'John' }
 * ```
 */
export function pick<T extends AnyObject, K extends keyof T>(
  obj: T,
  keys: K[],
): PickByKey<T, K> {
  if (!obj || typeof obj !== 'object') {
    return {} as PickByKey<T, K>
  }

  const result = {} as PickByKey<T, K>

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      ;(result as any)[key] = obj[key]
    }
  }

  return result
}
