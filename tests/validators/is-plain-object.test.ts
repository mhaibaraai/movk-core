import { describe, expect, it } from 'vitest'
import { isPlainObject } from '../../src/validators'

describe('isPlainObject (是否为纯对象)', () => {
  it('对于纯对象应该返回 true', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1 })).toBe(true)
  })

  it('对于非纯对象应该返回 false', () => {
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(() => {})).toBe(false)
  })
})
