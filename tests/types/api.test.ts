import type { ApiAwaitable, ApiAwaitedReturn, ApiUnwrapPromise, VoidCallback } from '../../src/types/api'
import { describe, expectTypeOf, it } from 'vitest'

describe('aPI 类型工具', () => {
  it('apiAwaitable', () => {
    expectTypeOf<ApiAwaitable<string>>().toEqualTypeOf<string | Promise<string>>()
    expectTypeOf<ApiAwaitable<number>>().toEqualTypeOf<number | Promise<number>>()
  })

  it('voidCallback 同步与异步均可赋值', () => {
    const sync: VoidCallback = () => {}
    expectTypeOf(sync).toBeFunction()

    const async: VoidCallback = async () => {
      await Promise.resolve()
    }
    expectTypeOf(async).toBeFunction()

    // 注意：TS 的 () => void 接受任意返回值，因此返回类型反例不可靠；改测必需参数
    // @ts-expect-error 不接受要求必传参数的函数
    const bad: VoidCallback = (x: string) => x.length
    void bad
  })

  it('apiUnwrapPromise', () => {
    expectTypeOf<ApiUnwrapPromise<Promise<string>>>().toEqualTypeOf<string>()
    expectTypeOf<ApiUnwrapPromise<string>>().toEqualTypeOf<string>()
    expectTypeOf<ApiUnwrapPromise<Promise<number> | number>>().toEqualTypeOf<number>()
  })

  it('apiAwaitedReturn', () => {
    expectTypeOf<ApiAwaitedReturn<() => string>>().toEqualTypeOf<string>()
    expectTypeOf<ApiAwaitedReturn<() => Promise<string>>>().toEqualTypeOf<string>()
    expectTypeOf<ApiAwaitedReturn<(a: number) => number>>().toEqualTypeOf<number>()
  })
})
