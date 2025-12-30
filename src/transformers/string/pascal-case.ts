import { baseTransform } from './base-transform'

/**
 * 将字符串转换为帕斯卡命名格式（PascalCase，每个单词首字母大写）。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 帕斯卡命名格式的字符串
 * @example
 * ```ts
 * pascalCase('firstName') // 'FirstName'
 * pascalCase('first_name') // 'FirstName'
 * pascalCase('first-name') // 'FirstName'
 * pascalCase('XMLHttpRequest') // 'XmlHttpRequest'
 * ```
 */
export function pascalCase(str: string): string {
  return baseTransform(str, { separator: '', casing: 'capitalize' })
}
