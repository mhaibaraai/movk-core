import { baseTransform } from './base-transform'

/**
 * 将字符串转换为短横线命名格式（kebab-case）。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 短横线命名格式的字符串
 * @example
 * ```ts
 * kebabCase('firstName') // 'first-name'
 * kebabCase('First Name') // 'first-name'
 * kebabCase('first_name') // 'first-name'
 * kebabCase('XMLHttpRequest') // 'xml-http-request'
 * ```
 */
export function kebabCase(str: string): string {
  return baseTransform(str, { separator: '-', casing: 'lower' })
}
