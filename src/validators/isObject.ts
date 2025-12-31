import type { AnyObject } from '../types'

/**
 * 检查值是否为对象类型
 *
 * @category Validators
 * @param value 待检查的值
 * @returns 是否为对象类型
 * @example
 * ```ts
 * console.log(isObject({})) // true
 * console.log(isObject({ name: 'John' })) // true
 * console.log(isObject([])) // false
 * console.log(isObject(null)) // false
 * console.log(isObject('string')) // false
 * ```
 */
export function isObject(value: any): value is AnyObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
