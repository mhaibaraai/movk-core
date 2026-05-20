import { describe, expect, it } from 'vitest'
import { lengthToPx } from '../../../src/utilities/css'

describe('lengthToPx', () => {
  it('应该解析 px 单位', () => {
    expect(lengthToPx('16px')).toBe(16)
    expect(lengthToPx('24 px')).toBe(24)
    expect(lengthToPx('100PX')).toBe(100)
  })

  it('应该解析 rem 单位（按 16 折算）', () => {
    expect(lengthToPx('1rem')).toBe(16)
    expect(lengthToPx('0.5rem')).toBe(8)
    expect(lengthToPx('2.5rem')).toBe(40)
  })

  it('应该解析 em 单位（按 16 折算）', () => {
    expect(lengthToPx('1em')).toBe(16)
    expect(lengthToPx('1.5em')).toBe(24)
  })

  it('应该把无单位的数字视为 px', () => {
    expect(lengthToPx('20')).toBe(20)
    expect(lengthToPx('.75')).toBe(0.75)
  })

  it('应该支持负值', () => {
    expect(lengthToPx('-8px')).toBe(-8)
    expect(lengthToPx('-1rem')).toBe(-16)
  })

  it('应该在非法输入时回退到 fallback', () => {
    expect(lengthToPx('auto')).toBe(16)
    expect(lengthToPx('1vw')).toBe(16)
    expect(lengthToPx('calc(1rem + 4px)')).toBe(16)
    expect(lengthToPx('')).toBe(16)
  })

  it('应该尊重自定义 fallback', () => {
    expect(lengthToPx('auto', 0)).toBe(0)
    expect(lengthToPx('', 8)).toBe(8)
  })

  it('应该容忍首尾空白', () => {
    expect(lengthToPx('  12px  ')).toBe(12)
  })
})
