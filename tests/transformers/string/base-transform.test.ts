import { describe, expect, it } from 'vitest'
import { baseTransform, transformFirstChar } from '../../../src/transformers/string/baseTransform'

describe('baseTransform', () => {
  describe('边界情况', () => {
    it('应处理空字符串', () => {
      expect(baseTransform('', { casing: 'lower' })).toBe('')
    })

    it('应处理无有效单词的字符串', () => {
      expect(baseTransform('___', { casing: 'lower' })).toBe('')
    })
  })

  describe('casing 选项', () => {
    const testStr = 'hello World'

    it('应将所有单词转换为小写', () => {
      expect(baseTransform(testStr, { casing: 'lower', separator: ' ' })).toBe('hello world')
    })

    it('应将所有单词转换为大写', () => {
      expect(baseTransform(testStr, { casing: 'upper', separator: ' ' })).toBe('HELLO WORLD')
    })

    it('应首字母大写化每个单词', () => {
      expect(baseTransform(testStr, { casing: 'capitalize', separator: ' ' })).toBe('Hello World')
    })

    it('应保持原始大小写（casing: none）', () => {
      expect(baseTransform(testStr, { casing: 'none', separator: ' ' })).toBe('hello World')
    })

    it('默认不应用任何 casing 转换', () => {
      expect(baseTransform(testStr, { separator: ' ' })).toBe('hello World')
    })
  })

  describe('separator 选项', () => {
    it('应使用自定义分隔符连接单词', () => {
      expect(baseTransform('hello world', { casing: 'lower', separator: '-' })).toBe('hello-world')
    })

    it('默认应使用空字符串作为分隔符', () => {
      expect(baseTransform('hello world', { casing: 'lower' })).toBe('helloworld')
    })

    it('应支持多字符分隔符', () => {
      expect(baseTransform('hello world', { casing: 'lower', separator: '__' })).toBe('hello__world')
    })

    it('应支持空格分隔符', () => {
      expect(baseTransform('helloWorld', { casing: 'lower', separator: ' ' })).toBe('hello world')
    })
  })

  describe('自定义 transform 函数', () => {
    it('应优先使用自定义 transform 函数', () => {
      const customTransform = (word: string, index: number) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      }

      expect(baseTransform('hello world', {
        casing: 'lower', // 应被忽略
        separator: ' ',
        transform: customTransform,
      })).toBe('hello WORLD')
    })

    it('应传递正确的参数给 transform 函数', () => {
      const calls: any[] = []
      const trackingTransform = (word: string, index: number, lower: string, upper: string) => {
        calls.push({ word, index, lower, upper })
        return lower
      }

      baseTransform('Hello WORLD', {
        separator: ' ',
        transform: trackingTransform,
      })

      expect(calls).toEqual([
        { word: 'Hello', index: 0, lower: 'hello', upper: 'HELLO' },
        { word: 'WORLD', index: 1, lower: 'world', upper: 'WORLD' },
      ])
    })

    it('应允许基于索引的条件转换', () => {
      const transform = (word: string, index: number, lower: string) => {
        return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1)
      }

      expect(baseTransform('foo bar baz', {
        separator: '',
        transform,
      })).toBe('fooBarBaz')
    })
  })

  describe('复杂场景', () => {
    it('应处理驼峰命名', () => {
      expect(baseTransform('getUserById', { casing: 'lower', separator: '_' })).toBe('get_user_by_id')
    })

    it('应处理帕斯卡命名', () => {
      expect(baseTransform('UserService', { casing: 'lower', separator: '-' })).toBe('user-service')
    })

    it('应处理带数字的字符串', () => {
      expect(baseTransform('version2Beta', { casing: 'lower', separator: '_' })).toBe('version_2_beta')
    })

    it('应处理带特殊字符的字符串', () => {
      expect(baseTransform('hello-world_foo', { casing: 'lower', separator: ' ' })).toBe('hello world foo')
    })

    it('应处理连续大写字母', () => {
      expect(baseTransform('XMLHttpRequest', { casing: 'lower', separator: '_' })).toBe('xml_http_request')
    })
  })
})

describe('transformFirstChar', () => {
  describe('边界情况', () => {
    it('应处理空字符串', () => {
      expect(transformFirstChar('', true)).toBe('')
      expect(transformFirstChar('', false)).toBe('')
    })

    it('应处理单字符字符串', () => {
      expect(transformFirstChar('a', true)).toBe('A')
      expect(transformFirstChar('A', false)).toBe('a')
    })
  })

  describe('转换为大写', () => {
    it('应将首字符转换为大写', () => {
      expect(transformFirstChar('hello', true)).toBe('Hello')
    })

    it('应保持其余字符不变', () => {
      expect(transformFirstChar('hELLO', true)).toBe('HELLO')
    })

    it('应处理已经大写的首字符', () => {
      expect(transformFirstChar('Hello', true)).toBe('Hello')
    })
  })

  describe('转换为小写', () => {
    it('应将首字符转换为小写', () => {
      expect(transformFirstChar('Hello', false)).toBe('hello')
    })

    it('应保持其余字符不变', () => {
      expect(transformFirstChar('HeLLo', false)).toBe('heLLo')
    })

    it('应处理已经小写的首字符', () => {
      expect(transformFirstChar('hello', false)).toBe('hello')
    })
  })

  describe('特殊字符', () => {
    it('应处理数字开头的字符串', () => {
      expect(transformFirstChar('123abc', true)).toBe('123abc')
      expect(transformFirstChar('123abc', false)).toBe('123abc')
    })

    it('应处理符号开头的字符串', () => {
      expect(transformFirstChar('_hello', true)).toBe('_hello')
      expect(transformFirstChar('_hello', false)).toBe('_hello')
    })

    it('应处理 Unicode 字符', () => {
      expect(transformFirstChar('über', true)).toBe('Über')
      expect(transformFirstChar('Über', false)).toBe('über')
    })
  })
})
