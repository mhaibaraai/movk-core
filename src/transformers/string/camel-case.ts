import { baseTransform } from './base-transform'

/**
 * 将字符串转换为驼峰命名格式（第一个单词小写，后续单词首字母大写）。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 驼峰命名格式的字符串
 * @example
 * ```ts
 * camelCase('First Name') // 'firstName'
 * camelCase('first_name') // 'firstName'
 * camelCase('first-name') // 'firstName'
 * camelCase('XMLHttpRequest') // 'xmlHttpRequest'
 * ```
 */
export function camelCase(str: string): string {
  return baseTransform(str, {
    separator: '',
    transform: (_, index, lower) => {
      if (index === 0)
        return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    },
  })
}
