import type { IsAny, MaybeFn, ReactiveValue, StripNullable, Suggest, WidenLiteral } from '../../src/types/general'
import { describe, expectTypeOf, it } from 'vitest'

describe('通用类型工具', () => {
  it('suggest', () => {
    type Color = Suggest<'red' | 'blue'>

    // 验证 Suggest 类型扩展了 string
    expectTypeOf<Color>().toExtend<string>()

    // 验证可以接受字面量值
    const color1: Color = 'red'
    const color2: Color = 'blue'
    expectTypeOf(color1).toBeString()
    expectTypeOf(color2).toBeString()

    // 验证可以接受任意字符串
    const other: Color = 'green'
    expectTypeOf(other).toBeString()
  })

  it('suggest 支持数字字面量', () => {
    type Status = Suggest<200 | 404>

    expectTypeOf<Status>().toExtend<number>()

    const ok: Status = 200
    const notFound: Status = 404
    const other: Status = 500
    expectTypeOf(ok).toBeNumber()
    expectTypeOf(notFound).toBeNumber()
    expectTypeOf(other).toBeNumber()
  })

  it('suggest 支持 bigint 字面量', () => {
    type Big = Suggest<1n | 2n>

    expectTypeOf<Big>().toExtend<bigint>()

    const a: Big = 1n
    const b: Big = 99n
    expectTypeOf(a).toBeBigInt()
    expectTypeOf(b).toBeBigInt()
  })

  it('suggest 不接受 boolean', () => {
    // @ts-expect-error boolean 不在 Suggest 的 T 约束内
    type _Bad = Suggest<true>
  })

  it('maybeFn 不带 Ctx 时回调为无参函数', () => {
    type Value = MaybeFn<string>

    // 直接值
    const direct: Value = 'static'
    expectTypeOf(direct).toBeString()

    // 无参函数
    const getter: Value = () => 'computed'
    expectTypeOf(getter).toBeFunction()

    // @ts-expect-error 不接受带参数的函数
    const withCtx: Value = (ctx: { foo: string }) => ctx.foo
    void withCtx
  })

  it('maybeFn 带 Ctx 时回调接收上下文', () => {
    interface Context { foo: string }
    type Value = MaybeFn<boolean, Context>

    const direct: Value = true
    expectTypeOf(direct).toBeBoolean()

    const withCtx: Value = ctx => ctx.foo === 'bar'
    expectTypeOf(withCtx).toBeFunction()
  })

  it('reactiveValue', () => {
    type Value = ReactiveValue<string>

    // 验证可以接受直接值
    const directValue: Value = 'hello'
    expectTypeOf(directValue).toBeString()

    // 验证可以接受 getter 函数
    const getterValue: Value = () => 'hello'
    expectTypeOf(getterValue).toBeFunction()

    // 验证带上下文的响应式值
    interface Context { foo: string }
    type ContextValue = ReactiveValue<boolean, Context>

    // 验证可以接受上下文回调函数
    const contextValue: ContextValue = (ctx: Context) => ctx.foo === 'bar'
    expectTypeOf(contextValue).toBeFunction()

    // 验证也可以接受直接值
    const directBool: ContextValue = true
    expectTypeOf(directBool).toBeBoolean()
  })

  it('stripNullable', () => {
    expectTypeOf<StripNullable<string | null | undefined>>().toEqualTypeOf<string>()
    expectTypeOf<StripNullable<number | null>>().toEqualTypeOf<number>()
    expectTypeOf<StripNullable<string | undefined>>().toEqualTypeOf<string>()
  })

  it('isAny', () => {
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>()
    expectTypeOf<IsAny<string>>().toEqualTypeOf<false>()
    expectTypeOf<IsAny<never>>().toEqualTypeOf<false>()
    expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>()
    expectTypeOf<IsAny<object>>().toEqualTypeOf<false>()
  })

  it('widenLiteral', () => {
    expectTypeOf<WidenLiteral<'hello'>>().toEqualTypeOf<string>()
    expectTypeOf<WidenLiteral<true>>().toEqualTypeOf<boolean>()
    expectTypeOf<WidenLiteral<false>>().toEqualTypeOf<boolean>()
    expectTypeOf<WidenLiteral<'foo' | undefined>>().toEqualTypeOf<string | undefined>()
    expectTypeOf<WidenLiteral<number>>().toEqualTypeOf<number>()
    expectTypeOf<WidenLiteral<any>>().toEqualTypeOf<any>()
    expectTypeOf<WidenLiteral<never>>().toEqualTypeOf<unknown>()
  })
})
