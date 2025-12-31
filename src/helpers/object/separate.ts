import type { AnyObject, OmitByKey, PickByKey } from '../../types/object'

/**
 * 将对象按指定键分离为两个对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要分离的键数组
 * @returns 包含picked和omitted两个对象的结果
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret',
 *   role: 'admin'
 * }
 *
 * const { picked, omitted } = separate(user, ['id', 'name'])
 * console.log(picked) // { id: 1, name: 'John' }
 * console.log(omitted) // { email: 'john@example.com', password: 'secret', role: 'admin' }
 *
 * // 用于分离敏感信息
 * const { picked: publicData, omitted: privateData } = separate(user, ['id', 'name', 'email'])
 * ```
 */
export function separate<T extends AnyObject, K extends keyof T>(
  obj: T,
  keys: K[],
): { picked: PickByKey<T, K>, omitted: OmitByKey<T, K> } {
  if (!obj || typeof obj !== 'object') {
    return {
      picked: {} as PickByKey<T, K>,
      omitted: {} as OmitByKey<T, K>,
    }
  }

  if (keys.length === 0) {
    return {
      picked: {} as PickByKey<T, K>,
      omitted: { ...obj } as OmitByKey<T, K>,
    }
  }

  const keysSet = new Set(keys)
  const picked = {} as PickByKey<T, K>
  const omitted = {} as OmitByKey<T, K>

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const typedKey = key as keyof T
      if (keysSet.has(typedKey as K)) {
        (picked as AnyObject)[key] = obj[typedKey]
      }
      else {
        (omitted as AnyObject)[key] = obj[typedKey]
      }
    }
  }

  return { picked, omitted }
}
