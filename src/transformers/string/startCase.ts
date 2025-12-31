import { words } from './words'

/**
 * 将字符串转换为Start Case格式（每个单词首字母大写，用空格分隔）。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns Start Case格式的字符串
 * @example
 * ```ts
 * startCase('firstName') // 'First Name'
 * startCase('first_name') // 'First Name'
 * startCase('first-name') // 'First Name'
 * startCase('XMLHttpRequest') // 'XML Http Request'
 * ```
 */
export function startCase(str: string): string {
  if (!str)
    return ''

  return words(str)
    .map((word) => {
      // 如果单词完全大写（可能是缩写词，且长度大于1），则保持不变。
      // 否则，只将首字母大写，其余小写。
      if (word.toUpperCase() === word && word.length > 1) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}
