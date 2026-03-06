import type { KnownKeys, Prettify, UnionToIntersection } from '../../src/types/object'
import { describe, expectTypeOf, it } from 'vitest'

describe('对象类型工具', () => {
  it('unionToIntersection', () => {
    type U = { a: number } | { b: string }
    type R = UnionToIntersection<U>

    expectTypeOf<R>().toMatchObjectType<{ a: number }>()
    expectTypeOf<R>().toMatchObjectType<{ b: string }>()
  })

  it('prettify - 展平交叉类型', () => {
    type A = { a: number } & { b: string }
    type B = Prettify<A>

    expectTypeOf<B>().toEqualTypeOf<{ a: number, b: string }>()
  })

  it('knownKeys - 普通对象类型返回所有字面量键', () => {
    interface _Controls { text: string, select: number, checkbox: boolean }
    type K = KnownKeys<_Controls>
    expectTypeOf<K>().toEqualTypeOf<'text' | 'select' | 'checkbox'>()
  })

  it('knownKeys - 纯索引签名类型返回 never', () => {
    interface _Indexed { [key: string]: string }
    type K = KnownKeys<_Indexed>
    expectTypeOf<K>().toEqualTypeOf<never>()
  })
})
