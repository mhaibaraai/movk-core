import { describe, expect, it } from 'vitest'
import { simpleHash } from '../src/utils/utilities/simple-hash'
import { getRandomUUID } from '../src/utils/utilities/uuid'

describe('工具函数', () => {
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

  describe('getRandomUUID', () => {
    it('应该生成一个符合 UUID v4 格式的字符串', () => {
      const uuid = getRandomUUID()
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      expect(uuid).toMatch(uuidRegex)
    })

    it('每次调用都应该生成不同的 UUID', () => {
      const uuid1 = getRandomUUID()
      const uuid2 = getRandomUUID()
      expect(uuid1).not.toBe(uuid2)
    })
  })
})
