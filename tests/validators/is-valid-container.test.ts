import { describe, expect, it } from 'vitest'
import { isValidContainer } from '../../src/validators'

describe('isValidContainer (是否为有效容器)', () => {
  it('应该正确验证容器', () => {
    expect(isValidContainer({})).toBe(true)
    expect(isValidContainer([])).toBe(true)
    expect(isValidContainer(null)).toBe(false)
    expect(isValidContainer('a')).toBe(false)
    expect(isValidContainer(1)).toBe(false)
  })
})
