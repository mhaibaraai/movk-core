import { describe, expect, it } from 'vitest'
import { getRandomUUID } from '../../src/helpers'

const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('getRandomUUID', () => {
  it('应该生成一个符合 UUID v4 格式的字符串', () => {
    const uuid = getRandomUUID()
    expect(uuid).toMatch(UUID_V4_RE)
  })

  it('每次调用都应该生成不同的 UUID', () => {
    const uuid1 = getRandomUUID()
    const uuid2 = getRandomUUID()
    expect(uuid1).not.toBe(uuid2)
  })
})
