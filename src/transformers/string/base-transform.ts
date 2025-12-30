import { words } from './words'

interface CaseTransform {
  /**
   * 单词之间的分隔符
   */
  separator?: string

  /**
   * 大小写转换规则
   */
  casing?: 'lower' | 'upper' | 'capitalize' | 'none'

  /**
   * 自定义转换函数，优先级高于 casing
   * @param word 原始单词
   * @param index 单词索引
   * @param lower 小写形式
   * @param upper 大写形式
   * @returns 转换后的单词
   */
  transform?: (word: string, index: number, lower: string, upper: string) => string
}

/**
 * 基础字符串转换函数，用于统一处理各种命名格式转换。
 *
 * @internal
 * @param str 要转换的字符串
 * @param transform 转换配置
 * @returns 转换后的字符串
 */
export function baseTransform(str: string, transform: CaseTransform): string {
  if (!str)
    return ''

  const wordList = words(str)
  if (wordList.length === 0)
    return ''

  return wordList
    .map((word, index) => {
      const lower = word.toLowerCase()
      const upper = word.toUpperCase()

      // 应用自定义转换逻辑
      if (transform.transform) {
        return transform.transform(word, index, lower, upper)
      }

      // 默认行为：根据 casing 配置
      switch (transform.casing) {
        case 'lower':
          return lower
        case 'upper':
          return upper
        case 'capitalize':
          return lower.charAt(0).toUpperCase() + lower.slice(1)
        default:
          return word
      }
    })
    .join(transform.separator ?? '')
}

/**
 * 简单的首字符转换函数。
 *
 * @internal
 * @param str 要转换的字符串
 * @param toUpper 是否转换为大写（false 则转换为小写）
 * @returns 转换后的字符串
 */
export function transformFirstChar(str: string, toUpper: boolean): string {
  if (!str)
    return ''

  const first = str.charAt(0)
  const transformed = toUpper ? first.toUpperCase() : first.toLowerCase()
  return transformed + str.slice(1)
}
