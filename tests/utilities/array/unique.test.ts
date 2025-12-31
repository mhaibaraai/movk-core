import { describe, expect, it } from 'vitest'
import { unique } from '../../../src/utilities/array'

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
