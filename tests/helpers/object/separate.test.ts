import { describe, expect, it } from 'vitest'
import { separate } from '../../../src/helpers/object'

describe('separate', () => {
  const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

  it('应该将对象分离为选中和忽略的部分', () => {
    const { picked, omitted } = separate(user, ['id', 'name'])
    expect(picked).toEqual({ id: 1, name: 'John' })
    expect(omitted).toEqual({ email: 'john@example.com', password: 'secret' })
  })
})
