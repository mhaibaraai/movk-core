import { describe, expect, it } from 'vitest'
import {
  appendQueryParam,
  getQueryParam,
  getQueryParams,
  hasQueryParam,
  parseQuery,
  removeQueryParam,
  setQueryParam,
  setQueryParams,
  stringifyQuery,
} from '../../../src/utilities/url'

describe('parseQuery', () => {
  it('应该解析简单查询字符串', () => {
    expect(parseQuery('name=John&age=30')).toEqual({
      name: 'John',
      age: '30',
    })
  })

  it('应该处理带 ? 前缀的查询字符串', () => {
    expect(parseQuery('?name=John')).toEqual({ name: 'John' })
  })

  it('应该将重复参数解析为数组', () => {
    expect(parseQuery('tags=a&tags=b&tags=c')).toEqual({
      tags: ['a', 'b', 'c'],
    })
  })

  it('应该正确解码 URL 编码', () => {
    expect(parseQuery('name=%E4%B8%AD%E6%96%87')).toEqual({
      name: '中文',
    })
  })

  it('空字符串应返回空对象', () => {
    expect(parseQuery('')).toEqual({})
    expect(parseQuery('?')).toEqual({})
  })

  it('应该处理空值参数', () => {
    expect(parseQuery('flag=')).toEqual({ flag: '' })
  })
})

describe('stringifyQuery', () => {
  it('应该序列化简单对象', () => {
    expect(stringifyQuery({ name: 'John', age: 30 })).toBe('name=John&age=30')
  })

  it('应该正确编码特殊字符', () => {
    expect(stringifyQuery({ name: '中文' })).toBe('name=%E4%B8%AD%E6%96%87')
    expect(stringifyQuery({ q: 'a b' })).toBe('q=a%20b')
  })

  it('应该处理数组值（默认 repeat 格式）', () => {
    expect(stringifyQuery({ tags: ['a', 'b', 'c'] })).toBe('tags=a&tags=b&tags=c')
  })

  it('应该支持 bracket 数组格式', () => {
    expect(stringifyQuery({ tags: ['a', 'b'] }, { arrayFormat: 'bracket' }))
      .toBe('tags[]=a&tags[]=b')
  })

  it('应该支持 index 数组格式', () => {
    expect(stringifyQuery({ tags: ['a', 'b'] }, { arrayFormat: 'index' }))
      .toBe('tags[0]=a&tags[1]=b')
  })

  it('应该支持 comma 数组格式', () => {
    expect(stringifyQuery({ tags: ['a', 'b'] }, { arrayFormat: 'comma' }))
      .toBe('tags=a,b')
  })

  it('应该支持跳过 null 值', () => {
    expect(stringifyQuery({ a: 'value', b: null, c: undefined }, { skipNull: true }))
      .toBe('a=value')
  })

  it('应该支持跳过空字符串', () => {
    expect(stringifyQuery({ a: 'value', b: '' }, { skipEmpty: true }))
      .toBe('a=value')
  })

  it('应该处理布尔值', () => {
    expect(stringifyQuery({ flag: true, disabled: false }))
      .toBe('flag=true&disabled=false')
  })
})

describe('getQueryParam', () => {
  it('应该获取指定参数值', () => {
    expect(getQueryParam('https://example.com?name=John&age=30', 'name')).toBe('John')
    expect(getQueryParam('https://example.com?name=John&age=30', 'age')).toBe('30')
  })

  it('参数不存在应返回 null', () => {
    expect(getQueryParam('https://example.com', 'name')).toBeNull()
    expect(getQueryParam('https://example.com?other=value', 'name')).toBeNull()
  })

  it('多值参数应返回第一个值', () => {
    expect(getQueryParam('https://example.com?tags=a&tags=b', 'tags')).toBe('a')
  })

  it('应该处理纯查询字符串', () => {
    expect(getQueryParam('?name=John', 'name')).toBe('John')
  })
})

describe('getQueryParams', () => {
  it('应该获取所有同名参数值', () => {
    expect(getQueryParams('https://example.com?tags=a&tags=b&tags=c', 'tags'))
      .toEqual(['a', 'b', 'c'])
  })

  it('单值参数应返回单元素数组', () => {
    expect(getQueryParams('https://example.com?name=John', 'name'))
      .toEqual(['John'])
  })

  it('参数不存在应返回空数组', () => {
    expect(getQueryParams('https://example.com', 'name')).toEqual([])
  })
})

describe('setQueryParam', () => {
  it('应该添加新参数', () => {
    expect(setQueryParam('https://example.com', 'page', 1))
      .toBe('https://example.com/?page=1')
  })

  it('应该更新已有参数', () => {
    expect(setQueryParam('https://example.com?page=1', 'page', 2))
      .toBe('https://example.com/?page=2')
  })

  it('应该保留其他参数', () => {
    const result = setQueryParam('https://example.com?page=1&sort=name', 'page', 2)
    expect(result).toContain('page=2')
    expect(result).toContain('sort=name')
  })

  it('null 值应删除参数', () => {
    expect(setQueryParam('https://example.com?page=1', 'page', null))
      .toBe('https://example.com/')
  })

  it('应该处理相对 URL', () => {
    expect(setQueryParam('/path', 'page', 1)).toBe('/path?page=1')
    expect(setQueryParam('/path?a=1', 'b', 2)).toBe('/path?a=1&b=2')
  })

  it('应该保留哈希', () => {
    expect(setQueryParam('/path#section', 'page', 1)).toBe('/path?page=1#section')
  })
})

describe('setQueryParams', () => {
  it('应该批量设置参数', () => {
    const result = setQueryParams('https://example.com', { page: 1, limit: 10 })
    expect(result).toContain('page=1')
    expect(result).toContain('limit=10')
  })

  it('应该支持数组参数', () => {
    const result = setQueryParams('https://example.com', { tags: ['a', 'b'] })
    expect(result).toContain('tags=a')
    expect(result).toContain('tags=b')
  })
})

describe('appendQueryParam', () => {
  it('应该追加参数而不覆盖', () => {
    expect(appendQueryParam('https://example.com?tag=a', 'tag', 'b'))
      .toBe('https://example.com/?tag=a&tag=b')
  })

  it('应该处理相对 URL', () => {
    expect(appendQueryParam('/path?a=1', 'b', 2)).toBe('/path?a=1&b=2')
  })

  it('null 或 undefined 值不应追加', () => {
    expect(appendQueryParam('https://example.com', 'a', null))
      .toBe('https://example.com')
  })
})

describe('removeQueryParam', () => {
  it('应该删除指定参数', () => {
    expect(removeQueryParam('https://example.com?page=1&sort=name', 'page'))
      .toBe('https://example.com/?sort=name')
  })

  it('应该删除所有同名参数', () => {
    expect(removeQueryParam('https://example.com?tag=a&tag=b', 'tag'))
      .toBe('https://example.com/')
  })

  it('删除唯一参数后应保持有效 URL', () => {
    expect(removeQueryParam('https://example.com?page=1', 'page'))
      .toBe('https://example.com/')
  })

  it('应该处理相对 URL', () => {
    expect(removeQueryParam('/path?a=1&b=2', 'a')).toBe('/path?b=2')
  })
})

describe('hasQueryParam', () => {
  it('应该检测参数存在', () => {
    expect(hasQueryParam('https://example.com?page=1', 'page')).toBe(true)
    expect(hasQueryParam('https://example.com?page=1', 'sort')).toBe(false)
  })

  it('应该检测无值参数', () => {
    expect(hasQueryParam('https://example.com?flag', 'flag')).toBe(true)
  })

  it('无查询字符串应返回 false', () => {
    expect(hasQueryParam('https://example.com', 'page')).toBe(false)
  })

  it('应该处理纯查询字符串', () => {
    expect(hasQueryParam('?name=value', 'name')).toBe(true)
  })
})
