import { baseTransform } from './base-transform'

/**
 * 将字符串转换为小写格式，单词之间用空格分隔。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 小写格式的字符串
 * @example
 * ```ts
 * lowerCase('firstName') // 'first name'
 * lowerCase('First_Name') // 'first name'
 * lowerCase('FIRST-NAME') // 'first name'
 * lowerCase('XMLHttpRequest') // 'xml http request'
 * ```
 */
export function lowerCase(str: string): string {
  return baseTransform(str, { separator: ' ', casing: 'lower' })
}
