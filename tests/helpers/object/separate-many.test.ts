import { describe, expect, it } from 'vitest'
import { separateMany } from '../../../src/helpers/object'

describe('separateMany', () => {
  const options = { id: 1, name: 'John', email: 'a@b.com', role: 'admin' }

  it('应该将对象分离为多个组和其他部分', () => {
    const { a, b, others } = separateMany(options, { a: ['id'], b: ['name'] })
    expect(a).toEqual({ id: 1 })
    expect(b).toEqual({ name: 'John' })
    expect(others).toEqual({ email: 'a@b.com', role: 'admin' })
  })
})
