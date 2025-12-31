import { describe, expect, it } from 'vitest'
import { flatten } from '../../../src/utilities/array'

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
