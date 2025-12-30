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
