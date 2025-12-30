import { describe, expect, it } from 'vitest'
import { joinPath } from '../../../src/helpers/path'

describe('joinPath', () => {
  it('应该将片段数组转换为字符串路径', () => {
    expect(joinPath(['a', 'b', 0, 'c'])).toBe('a.b[0].c')
    expect(joinPath(['a', 'x.y', 0])).toBe('a[\'x.y\'][0]')
  })
})
