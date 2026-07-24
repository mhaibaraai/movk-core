import { describe, expect, it } from 'vitest'
import { mapRange } from '../../../src/utilities/math'

describe('mapRange', () => {
  it('应该线性映射区间内的值', () => {
    expect(mapRange(5, [0, 10], [0, 100])).toBe(50)
    expect(mapRange(0, [0, 10], [4, 20])).toBe(4)
    expect(mapRange(10, [0, 10], [4, 20])).toBe(20)
    expect(mapRange(2.5, [0, 10], [0, 1])).toBe(0.25)
  })

  it('应该支持负数输入区间', () => {
    expect(mapRange(0, [-10, 10], [0, 100])).toBe(50)
    expect(mapRange(-10, [-10, 10], [0, 100])).toBe(0)
  })

  it('应该支持倒序输出区间', () => {
    expect(mapRange(0, [0, 10], [20, 4])).toBe(20)
    expect(mapRange(10, [0, 10], [20, 4])).toBe(4)
    expect(mapRange(5, [0, 10], [20, 4])).toBe(12)
  })

  it('应该默认对越界输入线性外推', () => {
    expect(mapRange(20, [0, 10], [0, 100])).toBe(200)
    expect(mapRange(-5, [0, 10], [0, 100])).toBe(-50)
  })

  it('应该在开启 clamp 后钳制到输出区间', () => {
    expect(mapRange(20, [0, 10], [0, 100], { clamp: true })).toBe(100)
    expect(mapRange(-5, [0, 10], [0, 100], { clamp: true })).toBe(0)
    expect(mapRange(5, [0, 10], [0, 100], { clamp: true })).toBe(50)
  })

  it('应该在倒序输出区间下正确钳制', () => {
    expect(mapRange(20, [0, 10], [20, 4], { clamp: true })).toBe(4)
    expect(mapRange(-5, [0, 10], [20, 4], { clamp: true })).toBe(20)
  })

  it('应该在输入区间退化为单点时返回输出下界', () => {
    expect(mapRange(5, [3, 3], [10, 20])).toBe(10)
    expect(mapRange(3, [3, 3], [10, 20])).toBe(10)
  })
})
