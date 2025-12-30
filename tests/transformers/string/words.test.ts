import { describe, expect, it } from 'vitest'
import { words } from '../../../src/transformers/string'

describe('words', () => {
  it('应该将 camelCase 字符串拆分为单词', () => {
    expect(words('helloWorld')).toEqual(['hello', 'World'])
    expect(words('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request'])
  })

  it('应该将 snake_case 字符串拆分为单词', () => {
    expect(words('hello_world')).toEqual(['hello', 'world'])
    expect(words('__FOO_BAR__')).toEqual(['FOO', 'BAR'])
  })

  it('应该将 kebab-case 字符串拆分为单词', () => {
    expect(words('hello-world')).toEqual(['hello', 'world'])
  })

  it('应该处理句子', () => {
    expect(words('Hello World')).toEqual(['Hello', 'World'])
  })

  it('应该处理空字符串或无效字符串', () => {
    expect(words('')).toEqual([])
    expect(words(null as any)).toEqual([])
  })
})
