import type { QueryParams, QueryParamValue } from '../../src/types/url'
import { describe, expectTypeOf, it } from 'vitest'

describe('uRL 类型', () => {
  it('queryParamValue', () => {
    expectTypeOf<QueryParamValue>().toEqualTypeOf<string | number | boolean | null | undefined>()
  })

  it('queryParams', () => {
    expectTypeOf<QueryParams>().toExtend<Record<string, QueryParamValue | QueryParamValue[]>>()
  })
})
