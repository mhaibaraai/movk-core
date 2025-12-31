import { describe, expect, it } from 'vitest'
import { pick } from '../../../src/helpers/object'

describe('pick', () => {
  const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

  it('应该从对象中选择指定的键', () => {
    const publicInfo = pick(user, ['id', 'name', 'email'])
    expect(publicInfo).toEqual({ id: 1, name: 'John', email: 'john@example.com' })
  })

  it('应该返回一个新对象', () => {
    const result = pick(user, ['id'])
    expect(result).not.toBe(user)
  })

  it('应该处理不存在的键', () => {
    const result = pick(user, ['id', 'nonexistent' as any])
    expect(result).toEqual({ id: 1 })
  })
})
