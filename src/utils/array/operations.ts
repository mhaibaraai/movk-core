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

/**
 * 将数组分割成指定大小的块
 *
 * @category Array
 * @param arr 待分割的数组
 * @param size 每个块的大小
 * @returns 分割后的二维数组
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const chunks = chunk(numbers, 3)
 * console.log(chunks) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
 * const pairs = chunk(names, 2)
 * console.log(pairs) // [['Alice', 'Bob'], ['Charlie', 'David'], ['Eve']]
 * ```
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * 数组扁平化，将嵌套数组展平到指定深度
 *
 * @category Array
 * @param arr 待扁平化的数组
 * @param depth 扁平化深度，默认为1
 * @returns 扁平化后的数组
 * @example
 * ```ts
 * const nested = [1, [2, 3], [4, [5, 6]]]
 * const flat1 = flatten(nested)
 * console.log(flat1) // [1, 2, 3, 4, [5, 6]]
 *
 * const flat2 = flatten(nested, 2)
 * console.log(flat2) // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function flatten<T>(arr: T[], depth = 1): any[] {
  return depth === 1 ? arr.flat() : arr.flat(depth)
}
