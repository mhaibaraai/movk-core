/**
 * 判断值是否为纯对象（不包括数组、函数、日期等）
 *
 * @category Validators
 * @param value 要检查的值
 * @returns 是否为纯对象
 * @example
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * isPlainObject(() => {}) // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  return !!value && typeof value === 'object' && !Array.isArray(value) && Object.prototype.toString.call(value) === '[object Object]'
}
