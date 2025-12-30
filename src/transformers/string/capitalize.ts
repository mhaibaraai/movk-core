/**
 * 将字符串首字母大写，其余字母小写。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * capitalize('hello') // 'Hello'
 * capitalize('HELLO') // 'Hello'
 * capitalize('hello world') // 'Hello world'
 * ```
 */
export function capitalize(str: string): string {
  if (!str)
    return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
