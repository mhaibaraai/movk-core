/**
 * 检查值是否为有效数字类型
 *
 * @category Validators
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
