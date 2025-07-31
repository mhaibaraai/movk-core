/**
 * 深度克隆对象，创建完全独立的副本
 *
 * @category Object
 * @param obj 待克隆的对象
 * @returns 深度克隆后的对象
 * @example
 * ```ts
 * const original = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     city: 'New York',
 *     zip: '10001'
 *   },
 *   hobbies: ['reading', 'coding']
 * }
 *
 * const cloned = deepClone(original)
 * cloned.address.city = 'Los Angeles'
 * cloned.hobbies.push('gaming')
 *
 * console.log(original.address.city) // 'New York' (未改变)
 * console.log(original.hobbies.length) // 2 (未改变)
 * console.log(cloned.address.city) // 'Los Angeles'
 * console.log(cloned.hobbies.length) // 3
 * ```
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T
  }

  if (typeof obj === 'object') {
    const cloned = {} as T
    for (const key in obj) {
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  }

  return obj
}
