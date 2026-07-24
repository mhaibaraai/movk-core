import { describe, expect, it } from 'vitest'
import { clamp } from '../../../src/utilities/math'

describe('clamp', () => {
  it('应该在区间内原样返回', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-3, -10, 10)).toBe(-3)
    expect(clamp(0.5, 0, 1)).toBe(0.5)
  })

  it('应该把越界值钳制到边界', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('应该保留边界值本身', () => {
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('应该在 min 大于 max 时交换区间', () => {
    expect(clamp(15, 10, 0)).toBe(10)
    expect(clamp(-5, 10, 0)).toBe(0)
    expect(clamp(5, 10, 0)).toBe(5)
  })

  it('应该支持区间退化为单点', () => {
    expect(clamp(5, 3, 3)).toBe(3)
    expect(clamp(1, 3, 3)).toBe(3)
  })

  it('应该支持无穷边界', () => {
    expect(clamp(1e10, 0, Number.POSITIVE_INFINITY)).toBe(1e10)
    expect(clamp(-1e10, Number.NEGATIVE_INFINITY, 0)).toBe(-1e10)
  })

  it('应该在 value 为 NaN 时返回 NaN', () => {
    expect(clamp(Number.NaN, 0, 10)).toBeNaN()
  })
})
