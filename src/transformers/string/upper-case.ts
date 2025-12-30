import { baseTransform } from './base-transform'

/**
 * 将字符串转换为大写格式，单词之间用空格分隔。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 大写格式的字符串
 * @example
 * ```ts
 * upperCase('firstName') // 'FIRST NAME'
 * upperCase('first_name') // 'FIRST NAME'
 * upperCase('first-name') // 'FIRST NAME'
 * upperCase('XMLHttpRequest') // 'XML HTTP REQUEST'
 * ```
 */
export function upperCase(str: string): string {
  return baseTransform(str, { separator: ' ', casing: 'upper' })
}
