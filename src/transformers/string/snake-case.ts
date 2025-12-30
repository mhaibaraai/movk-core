import { baseTransform } from './base-transform'

/**
 * 将字符串转换为下划线命名格式（snake_case）。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 下划线命名格式的字符串
 * @example
 * ```ts
 * snakeCase('firstName') // 'first_name'
 * snakeCase('First Name') // 'first_name'
 * snakeCase('first-name') // 'first_name'
 * snakeCase('XMLHttpRequest') // 'xml_http_request'
 * ```
 */
export function snakeCase(str: string): string {
  return baseTransform(str, { separator: '_', casing: 'lower' })
}
