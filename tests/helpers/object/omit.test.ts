import { describe, expect, it } from 'vitest'
import { omit } from '../../../src/helpers/object'

describe('omit', () => {
  const user = { id: 1, name: 'John', password: 'secret', email: 'john@example.com' }

  it('应该从对象中忽略指定的键', () => {
    const publicUser = omit(user, ['password'])
    expect(publicUser).toEqual({ id: 1, name: 'John', email: 'john@example.com' })
    expect(publicUser).not.toHaveProperty('password')
  })

  it('应该返回一个新对象', () => {
    const result = omit(user, ['password'])
    expect(result).not.toBe(user)
  })

  it('应该处理空键数组', () => {
    expect(omit(user, [])).toEqual(user)
  })
})
