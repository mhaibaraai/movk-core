/**
 * 生成字符串的简单哈希值
 *
 * @category Helpers
 * @param str 待哈希的字符串
 * @returns 32位哈希值转换为36进制字符串
 * @example
 * ```ts
 * const hash1 = simpleHash('hello world')
 * console.log(hash1) // 'nf5xd4'
 *
 * const hash2 = simpleHash('hello world')
 * console.log(hash1 === hash2) // true，相同字符串产生相同哈希
 *
 * const hash3 = simpleHash('hello world!')
 * console.log(hash1 === hash3) // false，不同字符串产生不同哈希
 * ```
 */
export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return Math.abs(hash).toString(36)
}
