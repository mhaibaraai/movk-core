import { describe, expect, it } from 'vitest'
import { simpleHash } from '../../src/helpers'

describe('simpleHash', () => {
  it('应该为同一个字符串生成相同的哈希值', () => {
    const str = 'hello world'
    expect(simpleHash(str)).toBe(simpleHash(str))
  })

  it('应该为不同的字符串生成不同的哈希值', () => {
    const str1 = 'hello world'
    const str2 = 'hello world!'
    expect(simpleHash(str1)).not.toBe(simpleHash(str2))
  })

  it('应该处理空字符串', () => {
    expect(simpleHash('')).toBe('0')
  })
})
