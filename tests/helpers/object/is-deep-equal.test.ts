import { describe, expect, it } from 'vitest'
import { isDeepEqual } from '../../../src/helpers/object'

describe('isDeepEqual', () => {
  it('原始值按 Object.is 比较', () => {
    expect(isDeepEqual(1, 1)).toBe(true)
    expect(isDeepEqual('a', 'b')).toBe(false)
    expect(isDeepEqual(Number.NaN, Number.NaN)).toBe(true)
    expect(isDeepEqual(null, undefined)).toBe(false)
  })

  it('结构相同的新引用对象视为相等', () => {
    expect(isDeepEqual({ a: 1, b: { c: [1, 2] } }, { b: { c: [1, 2] }, a: 1 })).toBe(true)
  })

  it('嵌套值不同返回 false', () => {
    expect(isDeepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false)
    expect(isDeepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false)
  })

  it('键数量或键名不同返回 false', () => {
    expect(isDeepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(isDeepEqual({ a: undefined }, { b: undefined })).toBe(false)
  })

  it('数组与对象不相等', () => {
    expect(isDeepEqual([], {})).toBe(false)
    expect(isDeepEqual([1], { 0: 1 })).toBe(false)
  })

  it('对象与原始值不相等', () => {
    expect(isDeepEqual({}, null)).toBe(false)
    expect(isDeepEqual(1, { valueOf: () => 1 })).toBe(false)
  })
})
