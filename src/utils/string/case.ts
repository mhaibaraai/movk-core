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
  if (!str)
    return ''

  const wordList = words(str)
  if (wordList.length === 0)
    return ''

  return wordList
    .map((word, index) => {
      const lower = word.toLowerCase()
      if (index === 0)
        return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join('')
}

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
  if (!str)
    return ''

  const wordList = words(str)
  return wordList.map(word => word.toLowerCase()).join('-')
}

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
  if (!str)
    return ''

  const wordList = words(str)
  return wordList.map(word => word.toLowerCase()).join('_')
}

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
  if (!str)
    return ''

  const wordList = words(str)
  return wordList
    .map((word) => {
      const lower = word.toLowerCase()
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join('')
}

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

/**
 * 将字符串首字母大写，其余字母保持原样。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * upperFirst('hello') // 'Hello'
 * upperFirst('hELLO') // 'HELLO'
 * upperFirst('hello world') // 'Hello world'
 * ```
 */
export function upperFirst(str: string): string {
  if (!str)
    return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将字符串首字母小写，其余字母保持原样。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 首字母小写的字符串
 * @example
 * ```ts
 * lowerFirst('Hello') // 'hello'
 * lowerFirst('HELLO') // 'hELLO'
 * lowerFirst('Hello World') // 'hello World'
 * ```
 */
export function lowerFirst(str: string): string {
  if (!str)
    return ''
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 将字符串转换为大写格式，单词之间用空格分隔。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 大写格式的字符串
 * @example
 * ```ts
 * upperCase('firstName') // 'FIRST NAME'
 * upperCase('first_name') // 'FIRST NAME'
 * upperCase('first-name') // 'FIRST NAME'
 * upperCase('XMLHttpRequest') // 'XML HTTP REQUEST'
 * ```
 */
export function upperCase(str: string): string {
  if (!str)
    return ''

  const wordList = words(str)
  return wordList.map(word => word.toUpperCase()).join(' ')
}

/**
 * 将字符串转换为小写格式，单词之间用空格分隔。
 *
 * @category String
 * @param str 要转换的字符串
 * @returns 小写格式的字符串
 * @example
 * ```ts
 * lowerCase('firstName') // 'first name'
 * lowerCase('First_Name') // 'first name'
 * lowerCase('FIRST-NAME') // 'first name'
 * lowerCase('XMLHttpRequest') // 'xml http request'
 * ```
 */
export function lowerCase(str: string): string {
  if (!str)
    return ''

  const wordList = words(str)
  return wordList.map(word => word.toLowerCase()).join(' ')
}

/**
 * 将驼峰命名转换为kebab-case
 * @deprecated Use `kebabCase` instead
 */
export const camelToKebab = kebabCase

/**
 * 将kebab-case转换为驼峰命名
 * @deprecated Use `camelCase` instead
 */
export const kebabToCamel = camelCase
