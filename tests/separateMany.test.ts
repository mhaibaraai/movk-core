import { describe, expect, it } from 'vitest'
import { separateMany } from '../src/utils/object/separate'

describe('separateMany', () => {
  it('基础：三分组 + others', () => {
    const src = { id: 1, name: 'John', email: 'a@b.com', role: 'admin', age: 18 }
    const { a, b, c, others } = separateMany(src, {
      a: ['id'],
      b: ['name', 'email'],
      c: ['role'],
    } as const)

    expect(a).toEqual({ id: 1 })
    expect(b).toEqual({ name: 'John', email: 'a@b.com' })
    expect(c).toEqual({ role: 'admin' })
    expect(others).toEqual({ age: 18 })
  })

  it('键冲突：先到先得', () => {
    const src = { a: 1, b: 2, c: 3 }
    const { x, y, others } = separateMany(src, {
      x: ['a', 'b'],
      y: ['b', 'c'],
    } as const)

    expect(x).toEqual({ a: 1, b: 2 })
    expect(y).toEqual({ c: 3 })
    expect(others).toEqual({})
  })

  it('非法键被忽略', () => {
    const src = { id: 1, name: 'John' }
    const { g1, others } = separateMany(src, {
      g1: ['id', 'missing' as keyof typeof src],
    } as const)

    expect(g1).toEqual({ id: 1 })
    expect(others).toEqual({ name: 'John' })
  })

  it('空映射：others 等于源对象', () => {
    const src = { id: 1, name: 'John' }
    const res = separateMany(src, {} as const)
    expect(res).toEqual({ others: { id: 1, name: 'John' } })
  })

  it('非对象输入：返回空分组与空 others', () => {
    const res = separateMany(1 as any, { g: ['x' as any] })
    expect(res).toEqual({ g: {}, others: {} })
  })
})
