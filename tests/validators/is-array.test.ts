import { describe, expect, it } from 'vitest'
import { isArray } from '../../src/validators'

describe('isArray (是否为数组)', () => {
  it('对于数组应该返回 true', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2])).toBe(true)
  })

  it('对于非数组应该返回 false', () => {
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
  })
})
