import { isArray } from './is-array'
import { isObject } from './is-object'
import { isString } from './is-string'

/**
 * 检查值是否为空（null、undefined、空字符串、空数组、空对象）
 *
 * @category Validators
 * @param value 待检查的值
 * @returns 是否为空值
 * @example
 * ```ts
 * console.log(isEmpty(null)) // true
 * console.log(isEmpty(undefined)) // true
 * console.log(isEmpty('')) // true
 * console.log(isEmpty([])) // true
 * console.log(isEmpty({})) // true
 * console.log(isEmpty([1, 2])) // false
 * console.log(isEmpty({ name: 'John' })) // false
 * console.log(isEmpty('hello')) // false
 * ```
 */
export function isEmpty(value: any): boolean {
  if (value == null) {
    return true
  }
  if (isArray(value) || isString(value)) {
    return value.length === 0
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }
  return false
}
