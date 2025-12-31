import type { FirstParam, FirstParameter, UnionToIntersection } from '../../../src/types/object/utilities'
import { describe, expectTypeOf, it } from 'vitest'

describe('对象工具辅助类型', () => {
  it('unionToIntersection', () => {
    type U = { a: number } | { b: string }
    type I = UnionToIntersection<U>

    // 验证交叉类型包含所有属性
    expectTypeOf<I['a']>().toEqualTypeOf<number>()
    expectTypeOf<I['b']>().toEqualTypeOf<string>()

    // 验证可以赋值给包含所有属性的对象（类型注解本身即为验证）
    const value: I = { a: 1, b: 'test' }
    expectTypeOf(value).toEqualTypeOf<I>()
  })

  it('firstParam', () => {
    interface Cfg { params: [id: string, flag?: boolean] }
    const param = {} as FirstParam<Cfg, 'params'>
    expectTypeOf(param).toEqualTypeOf<string>()

    type Invalid = FirstParam<{ params: string }, 'params'>
    const invalid = {} as Invalid
    expectTypeOf(invalid).toBeNever()
  })

  it('firstParameter', () => {
    type Fn = (x: number, y: string) => void
    const fnParam = {} as FirstParameter<Fn>
    expectTypeOf(fnParam).toEqualTypeOf<number>()

    type NonFn = FirstParameter<string>
    expectTypeOf<NonFn>().toEqualTypeOf<undefined>()
  })
})
