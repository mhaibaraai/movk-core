import { describe, expect, it } from 'vitest'
import { isFunction } from '../../src/validators'

describe('isFunction (是否为函数)', () => {
  it('对于函数应该返回 true', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(Math.max)).toBe(true)
  })

  it('对于非函数应该返回 false', () => {
    expect(isFunction({})).toBe(false)
    expect(isFunction(null)).toBe(false)
  })
})
