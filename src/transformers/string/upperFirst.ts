import { transformFirstChar } from './baseTransform'

/**
 * 将字符串首字母大写，其余字母保持原样。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * upperFirst('hello') // 'Hello'
 * upperFirst('hELLO') // 'HELLO'
 * upperFirst('hello world') // 'Hello world'
 * ```
 */
export function upperFirst(str: string): string {
  return transformFirstChar(str, true)
}
