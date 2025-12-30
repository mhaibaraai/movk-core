import { describe, expect, it } from 'vitest'
import { getPath } from '../../../src/helpers/path'

describe('getPath', () => {
  const obj = { a: { b: { c: 1, d: undefined }, e: null }, arr: [{ x: 9 }] }

  it('应该使用点表示法获取值', () => {
    expect(getPath(obj, 'a.b.c')).toBe(1)
  })

  it('应该使用方括号表示法获取值', () => {
    expect(getPath(obj, 'arr[0].x')).toBe(9)
  })

  it('对于 undefined 属性，应该返回默认值', () => {
    expect(getPath(obj, 'a.b.d', 42)).toBe(42)
  })

  it('对于 null 属性，应该返回 null，而不是默认值', () => {
    expect(getPath(obj, 'a.e', 100)).toBeNull()
  })

  it('对于不存在的路径，应该返回默认值', () => {
    expect(getPath(obj, 'a.f.g', 'default')).toBe('default')
  })

  it('对于空路径，应该返回对象本身', () => {
    expect(getPath(obj, '')).toBe(obj)
  })
})
