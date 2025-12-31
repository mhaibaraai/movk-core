/**
 * 检查值是否为有效的容器类型（对象或数组）
 *
 * - isObject: 仅检查纯对象，排除数组
 * - isValidContainer: 检查所有可作为容器的类型（对象 + 数组）
 *
 * 支持 Vue 3 的 Proxy 对象和 Proxy 数组。
 *
 * @category Validators
 * @param value - 待检查的值
 * @returns 是否为有效容器（对象或数组）
 * @example
 * ```ts
 * isValidContainer({})              // true
 * isValidContainer([])              // true
 * isValidContainer(new Proxy({}, {})) // true
 * isValidContainer(null)            // false
 * isValidContainer('string')        // false
 * isValidContainer(123)             // false
 * ```
 */
export function isValidContainer(value: any): boolean {
  return value !== null && typeof value === 'object'
}
