import { describe, expect, it } from 'vitest'
import { chunk } from '../src/utils/array'

describe('utils', () => {
  describe('array', () => {
    it('chunk', () => {
      expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
      expect(chunk(['Alice', 'Bob', 'Charlie', 'David', 'Eve'], 2)).toEqual([
        ['Alice', 'Bob'],
        ['Charlie', 'David'],
        ['Eve'],
      ])
      expect(chunk([], 3)).toEqual([])
      expect(chunk([1, 2], 5)).toEqual([[1, 2]])
    })
  })
})
