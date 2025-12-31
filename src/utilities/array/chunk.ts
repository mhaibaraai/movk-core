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
