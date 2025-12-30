import { describe, expect, it } from 'vitest'
import { isEmpty } from '../../src/validators'

describe('isEmpty (是否为空)', () => {
  it('对于空值应该返回 true', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })

  it('对于非空值应该返回 false', () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })
})
