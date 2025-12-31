import type { ReactiveValue, StripNullable, Suggest } from '../../src/types/general'
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
})
