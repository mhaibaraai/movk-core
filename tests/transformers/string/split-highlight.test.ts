import { describe, expect, it } from 'vitest'
import { splitHighlight } from '../../../src/transformers/string'

describe('splitHighlight (高亮切分)', () => {
  it('按关键字切分并标记命中片段，保留原始大小写', () => {
    expect(splitHighlight('ABC', 'b')).toEqual([
      { text: 'A', match: false },
      { text: 'B', match: true },
      { text: 'C', match: false },
    ])
  })

  it('多次命中全部标记', () => {
    expect(splitHighlight('oxo', 'o')).toEqual([
      { text: 'o', match: true },
      { text: 'x', match: false },
      { text: 'o', match: true },
    ])
  })

  it('命中位于结尾时无多余空片段', () => {
    expect(splitHighlight('foo', 'oo')).toEqual([
      { text: 'f', match: false },
      { text: 'oo', match: true },
    ])
  })

  it('空关键字返回整段不命中', () => {
    expect(splitHighlight('hello', '')).toEqual([{ text: 'hello', match: false }])
    expect(splitHighlight('hello', '   ')).toEqual([{ text: 'hello', match: false }])
  })

  it('未命中返回整段不命中', () => {
    expect(splitHighlight('abc', 'z')).toEqual([{ text: 'abc', match: false }])
  })

  it('空文本返回单个空片段', () => {
    expect(splitHighlight('', 'a')).toEqual([{ text: '', match: false }])
  })
})
