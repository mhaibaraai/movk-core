import type { DeepPartial } from '../../../src/types/object/deep'
import { describe, expectTypeOf, it } from 'vitest'

describe('深度对象类型', () => {
  it('deepPartial', () => {
    interface Src {
      a: number
      b: {
        c: string
        d: {
          e: boolean
        }
      }
      f: number[]
    }

    // 验证 DeepPartial 使所有属性可选
    type Result = DeepPartial<Src>

    // 验证空对象是合法的 DeepPartial（类型注解本身即为验证）
    const result: Result = {}
    expectTypeOf(result).toEqualTypeOf<Result>()

    // 精确验证基本属性类型
    expectTypeOf<Result['a']>().toEqualTypeOf<number | undefined>()

    // 精确验证嵌套对象属性结构
    type B = Result['b']
    expectTypeOf<B>().toEqualTypeOf<{
      c?: string | undefined
      d?: {
        e?: boolean | undefined
      } | undefined
    } | undefined>()

    // 验证数组类型被处理为 DeepPartial
    type F = Result['f']
    // number[] 是 object，所以会递归应用 DeepPartial
    expectTypeOf<F>().toEqualTypeOf<DeepPartial<number[]> | undefined>()
  })
})
