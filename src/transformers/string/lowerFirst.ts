import { transformFirstChar } from './baseTransform'

/**
 * 将字符串首字母小写，其余字母保持原样。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 首字母小写的字符串
 * @example
 * ```ts
 * lowerFirst('Hello') // 'hello'
 * lowerFirst('HELLO') // 'hELLO'
 * lowerFirst('Hello World') // 'hello World'
 * ```
 */
export function lowerFirst(str: string): string {
  return transformFirstChar(str, false)
}
