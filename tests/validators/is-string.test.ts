import { describe, expect, it } from 'vitest'
import { isString } from '../../src/validators'

describe('isString (是否为字符串)', () => {
  it('对于字符串应该返回 true', () => {
    expect(isString('')).toBe(true)
    expect(isString('hello')).toBe(true)
  })

  it('对于非字符串应该返回 false', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
  })
})
