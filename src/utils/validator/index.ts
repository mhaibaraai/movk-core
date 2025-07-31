import type { AnyObject } from '../../types'

/**
 * 检查值是否为对象类型
 *
 * @category Validator
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

/**
 * 检查值是否为数组类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为数组类型
 * @example
 * ```ts
 * console.log(isArray([])) // true
 * console.log(isArray([1, 2, 3])) // true
 * console.log(isArray({})) // false
 * console.log(isArray('string')) // false
 * ```
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 检查值是否为字符串类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为字符串类型
 * @example
 * ```ts
 * console.log(isString('hello')) // true
 * console.log(isString('')) // true
 * console.log(isString(123)) // false
 * console.log(isString(null)) // false
 * ```
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * 检查值是否为有效数字类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为有效数字类型
 * @example
 * ```ts
 * console.log(isNumber(123)) // true
 * console.log(isNumber(0)) // true
 * console.log(isNumber(NaN)) // false
 * console.log(isNumber('123')) // false
 * ```
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 检查值是否为函数类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为函数类型
 * @example
 * ```ts
 * console.log(isFunction(() => {})) // true
 * console.log(isFunction(function() {})) // true
 * console.log(isFunction(Math.max)) // true
 * console.log(isFunction('string')) // false
 * ```
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 检查值是否为空（null、undefined、空字符串、空数组、空对象）
 *
 * @category Validator
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
