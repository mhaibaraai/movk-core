/**
 * 将字符串首字母大写
 *
 * @category String
 * @param str 待处理的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * console.log(capitalize('hello')) // 'Hello'
 * console.log(capitalize('WORLD')) // 'WORLD'
 * console.log(capitalize('')) // ''
 * console.log(capitalize('a')) // 'A'
 * ```
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将驼峰命名转换为kebab-case
 *
 * @category String
 * @param str 驼峰命名的字符串
 * @returns kebab-case格式的字符串
 * @example
 * ```ts
 * console.log(camelToKebab('helloWorld')) // 'hello-world'
 * console.log(camelToKebab('firstName')) // 'first-name'
 * console.log(camelToKebab('XMLHttpRequest')) // 'x-m-l-http-request'
 * console.log(camelToKebab('hello')) // 'hello'
 * ```
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 将kebab-case转换为驼峰命名
 *
 * @category String
 * @param str kebab-case格式的字符串
 * @returns 驼峰命名的字符串
 * @example
 * ```ts
 * console.log(kebabToCamel('hello-world')) // 'helloWorld'
 * console.log(kebabToCamel('first-name')) // 'firstName'
 * console.log(kebabToCamel('background-color')) // 'backgroundColor'
 * console.log(kebabToCamel('hello')) // 'hello'
 * ```
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}
