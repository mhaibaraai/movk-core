import { describe, expect, it } from 'vitest'
import { omitUndefined } from '../../../src/helpers/object'

describe('omitUndefined', () => {
  it('应该忽略值为 undefined 的键', () => {
    const data = { name: 'John', age: undefined, city: 'New York', country: undefined }
    const cleaned = omitUndefined(data)
    expect(cleaned).toEqual({ name: 'John', city: 'New York' })
  })

  it('不应该忽略 null 或其他假值', () => {
    const data = { a: undefined, b: null, c: 0, d: '', e: false }
    const cleaned = omitUndefined(data)
    expect(cleaned).toEqual({ b: null, c: 0, d: '', e: false })
  })
})
