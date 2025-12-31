import { describe, expect, it } from 'vitest'
import { chunk } from '../../../src/utilities/array'

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
