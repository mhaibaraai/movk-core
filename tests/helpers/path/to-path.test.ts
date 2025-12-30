import { describe, expect, it } from 'vitest'
import { toPath } from '../../../src/helpers/path'

describe('toPath', () => {
  it('应该将字符串路径转换为片段数组', () => {
    expect(toPath('a.b[0].c')).toEqual(['a', 'b', 0, 'c'])
    expect(toPath('a[\'x.y\']')).toEqual(['a', 'x.y'])
    expect(toPath('a[0][1]')).toEqual(['a', 0, 1])
  })
})
