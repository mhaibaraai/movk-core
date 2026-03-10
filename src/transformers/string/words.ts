const SEPARATOR_RE = /[_-]/g
const WORDS_RE = /[A-Z]{2,}(?=[A-Z][a-z]|\b)|[A-Z]?[a-z]+|\d+/g

/**
 * 将字符串分解为单词数组。支持camelCase、snake_case、kebab-case等各种命名风格。
 *
 * @category String
 * @param str 要分解的字符串
 * @returns 单词数组
 * @example
 * ```ts
 * words('helloWorld') // ['hello', 'World']
 * words('hello_world') // ['hello', 'world']
 * words('hello-world') // ['hello', 'world']
 * words('XMLHttpRequest') // ['XML', 'Http', 'Request']
 * ```
 */
export function words(str: string): string[] {
  if (!str)
    return []

  const processedStr = str.replace(SEPARATOR_RE, ' ')
  const matches = processedStr.match(WORDS_RE)

  return matches || []
}
