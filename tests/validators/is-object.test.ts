import { describe, expect, it } from 'vitest'
import { isObject } from '../../src/validators'

describe('isObject (是否为对象)', () => {
  it('对于对象应该返回 true', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('对于非对象应该返回 false', () => {
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject(() => {})).toBe(false)
  })
})
