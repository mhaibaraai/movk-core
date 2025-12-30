/**
 * 检查值是否为字符串类型
 *
 * @category Validators
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
