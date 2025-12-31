import type { VNode } from 'vue'
import type { AnyObject, IsPlainObject, Merge, StringOrVNode, UnknownObject } from '../../../src/types/object/basic'
import { describe, expectTypeOf, it } from 'vitest'

describe('基本对象类型', () => {
  it('unknownObject', () => {
    expectTypeOf<UnknownObject>().toEqualTypeOf<Record<string, unknown>>()
  })

  it('anyObject', () => {
    expectTypeOf<AnyObject>().toEqualTypeOf<Record<string, any>>()
  })

  it('stringOrVNode', () => {
    expectTypeOf<StringOrVNode>().toEqualTypeOf<string | VNode | (() => VNode)>()
  })

  it('merge', () => {
    interface T { a: number, c: string }
    interface U { a: string, b: boolean }
    type M = Merge<T, U>

    // 验证 Merge 类型的每个属性
    // U 的属性覆盖 T，保留 T 的其他属性
    expectTypeOf<M['a']>().toEqualTypeOf<string>()
    expectTypeOf<M['b']>().toEqualTypeOf<boolean>()
    expectTypeOf<M['c']>().toEqualTypeOf<string>()

    // 验证类型可赋值性（类型注解本身即为验证）
    const value: M = { a: 'test', b: true, c: 'test' }
    expectTypeOf(value).toEqualTypeOf<M>()
  })

  it('isPlainObject', () => {
    const plainObj = {} as IsPlainObject<{ a: number }>
    expectTypeOf(plainObj).toEqualTypeOf<true>()

    const arr = {} as IsPlainObject<string[]>
    expectTypeOf(arr).toEqualTypeOf<false>()

    const func = {} as IsPlainObject<() => void>
    expectTypeOf(func).toEqualTypeOf<false>()

    const date = {} as IsPlainObject<Date>
    expectTypeOf(date).toEqualTypeOf<false>()

    const str = {} as IsPlainObject<string>
    expectTypeOf(str).toEqualTypeOf<false>()

    const nullVal = {} as IsPlainObject<null>
    expectTypeOf(nullVal).toEqualTypeOf<false>()
  })
})
