import type { AnyObject } from '../../types'

/**
 * 将对象的键名转换为kebab-case格式
 *
 * @category Object
 * @param obj 待转换的对象
 * @param deep 是否深度转换嵌套对象，默认为false
 * @returns 转换后的对象
 * @example
 * ```ts
 * const obj = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   userInfo: {
 *     birthDate: '1990-01-01',
 *     phoneNumber: '123-456-7890'
 *   }
 * }
 *
 * const converted = convertToKebabCase(obj)
 * console.log(converted)
 * // {
 * //   'first-name': 'John',
 * //   'last-name': 'Doe',
 * //   'user-info': { birthDate: '1990-01-01', phoneNumber: '123-456-7890' }
 * // }
 *
 * const deepConverted = convertToKebabCase(obj, true)
 * console.log(deepConverted)
 * // {
 * //   'first-name': 'John',
 * //   'last-name': 'Doe',
 * //   'user-info': { 'birth-date': '1990-01-01', 'phone-number': '123-456-7890' }
 * // }
 * ```
 */
export function convertToKebabCase<T extends AnyObject>(
  obj: T,
  deep: boolean = false,
): T {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj
  }

  const convertKey = (key: string): string =>
    key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()

  const result: AnyObject = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = convertKey(key)
      const value = obj[key]

      if (deep && value && typeof value === 'object' && !Array.isArray(value)) {
        result[newKey] = convertToKebabCase(value, true)
      }
      else {
        result[newKey] = value
      }
    }
  }

  return result as T
}
