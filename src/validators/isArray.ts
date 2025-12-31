/**
 * 检查值是否为数组类型
 *
 * @category Validators
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
