import type { ApiAwaitable, ApiAwaitedReturn, ApiUnwrapPromise } from '../../src/types/api'
import { describe, expectTypeOf, it } from 'vitest'

describe('aPI 类型工具', () => {
  it('apiAwaitable', () => {
    expectTypeOf<ApiAwaitable<string>>().toEqualTypeOf<string | Promise<string>>()
    expectTypeOf<ApiAwaitable<number>>().toEqualTypeOf<number | Promise<number>>()
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
