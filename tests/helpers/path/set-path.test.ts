import { describe, expect, it } from 'vitest'
import { deepClone } from '../../../src/helpers/object'
import { setPath } from '../../../src/helpers/path'

describe('setPath', () => {
  const obj = { a: { b: { c: 1, d: undefined }, e: null }, arr: [{ x: 9 }] }

  it('应该在现有路径上设置值', () => {
    const newObj = deepClone(obj)
    setPath(newObj, 'a.b.c', 2)
    expect(newObj.a.b.c).toBe(2)
  })

  it('应该为新路径创建嵌套对象', () => {
    const newObj: any = {}
    setPath(newObj, 'a.b.c', 1)
    expect(newObj).toEqual({ a: { b: { c: 1 } } })
  })

  it('应该为方括号中的数字索引创建嵌套数组', () => {
    const newObj: any = {}
    setPath(newObj, 'a.b[0].c', 7)
    expect(newObj).toEqual({ a: { b: [{ c: 7 }] } })
  })

  it('应该扩展现有数组', () => {
    const newObj: any = { a: { b: [{ c: 1 }] } }
    setPath(newObj, 'a.b[1].d', 8)
    expect(newObj.a.b[1]).toEqual({ d: 8 })
  })
})
