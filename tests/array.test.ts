import { describe, expect, it } from 'vitest'
import { chunk, flatten, unique } from '../src/utils/array'

describe('数组操作', () => {
  describe('unique', () => {
    it('应该从数字数组中移除重复项', () => {
      const numbers = [1, 2, 2, 3, 3, 4]
      expect(unique(numbers)).toEqual([1, 2, 3, 4])
    })

    it('应该从字符串数组中移除重复项', () => {
      const strings = ['a', 'b', 'a', 'c']
      expect(unique(strings)).toEqual(['a', 'b', 'c'])
    })

    it('应该处理空数组', () => {
      expect(unique([])).toEqual([])
    })

    it('应该处理没有重复项的数组', () => {
      const numbers = [1, 2, 3, 4]
      expect(unique(numbers)).toEqual([1, 2, 3, 4])
    })

    it('应该处理包含各种类型（包括对象）的数组', () => {
      const obj1 = { a: 1 }
      const obj2 = { a: 1 }
      const arr = [1, 'a', obj1, obj1, obj2]
      expect(unique(arr)).toEqual([1, 'a', obj1, obj2])
    })
  })

  describe('chunk', () => {
    it('应该将数组分割成指定大小的块', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      expect(chunk(numbers, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    })

    it('应该处理最后一个块较小的情况', () => {
      const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
      expect(chunk(names, 2)).toEqual([['Alice', 'Bob'], ['Charlie', 'David'], ['Eve']])
    })

    it('应该处理块大小大于数组长度的情况', () => {
      const numbers = [1, 2, 3]
      expect(chunk(numbers, 5)).toEqual([[1, 2, 3]])
    })

    it('应该处理空数组', () => {
      expect(chunk([], 3)).toEqual([])
    })
  })

  describe('flatten', () => {
    it('默认情况下应该将数组扁平化一层', () => {
      const nested = [1, [2, 3], [4, [5, 6]]]
      expect(flatten(nested)).toEqual([1, 2, 3, 4, [5, 6]])
    })

    it('应该将数组扁平化到指定深度', () => {
      const nested = [1, [2, 3], [4, [5, 6]]]
      expect(flatten(nested, 2)).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('应该处理已经扁平的数组', () => {
      const flat = [1, 2, 3, 4, 5]
      expect(flatten(flat)).toEqual([1, 2, 3, 4, 5])
    })

    it('应该处理空数组', () => {
      expect(flatten([])).toEqual([])
    })

    it('如果传入 Infinity，应该扁平化到无限深度', () => {
      const deeplyNested = [1, [2, [3, [4, [5]]]]]
      expect(flatten(deeplyNested, Infinity)).toEqual([1, 2, 3, 4, 5])
    })
  })
})
