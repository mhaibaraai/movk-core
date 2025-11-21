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

  // Step 1: Replace common separators with spaces
  const processedStr = str.replace(/[_-]/g, ' ')

  // Step 2: Split camelCase/PascalCase words and handle acronyms
  const matches = processedStr.match(/[A-Z]{2,}(?=[A-Z][a-z]|\b)|[A-Z]?[a-z]+|\d+/g)

  return matches || []
}
