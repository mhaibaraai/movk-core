/**
 * 数组去重，返回去除重复元素后的新数组
 *
 * @category Array
 * @param arr 待去重的数组
 * @returns 去重后的新数组
 * @example
 * ```ts
 * const numbers = [1, 2, 2, 3, 3, 4]
 * const uniqueNumbers = unique(numbers)
 * console.log(uniqueNumbers) // [1, 2, 3, 4]
 *
 * const strings = ['a', 'b', 'a', 'c']
 * const uniqueStrings = unique(strings)
 * console.log(uniqueStrings) // ['a', 'b', 'c']
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}
