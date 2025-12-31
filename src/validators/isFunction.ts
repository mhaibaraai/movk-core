/**
 * 检查值是否为函数类型
 *
 * @category Validators
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
