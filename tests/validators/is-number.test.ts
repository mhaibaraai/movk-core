import { describe, expect, it } from 'vitest'
import { isNumber } from '../../src/validators'

describe('isNumber (是否为数字)', () => {
  it('对于数字应该返回 true', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(123)).toBe(true)
    expect(isNumber(-123.45)).toBe(true)
  })

  it('对于非数字或 NaN 应该返回 false', () => {
    expect(isNumber(Number.NaN)).toBe(false)
    expect(isNumber('123')).toBe(false)
    expect(isNumber(null)).toBe(false)
  })
})
