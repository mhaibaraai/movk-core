import { describe, expect, it } from 'vitest'
import {
  buildUrl,
  ensureLeadingSlash,
  ensureTrailingSlash,
  getRelativePath,
  isSameOrigin,
  joinUrl,
  normalizeUrl,
  removeLeadingSlash,
  removeTrailingSlash,
  safeDecodeURIComponent,
  safeEncodeURIComponent,
  toAbsoluteUrl,
} from '../../../src/utilities/url'

describe('joinUrl', () => {
  it('应该正确连接 URL 片段', () => {
    expect(joinUrl('https://example.com', 'api', 'users'))
      .toBe('https://example.com/api/users')
  })

  it('应该处理多余的斜杠', () => {
    expect(joinUrl('https://example.com/', '/api/', '/users/'))
      .toBe('https://example.com/api/users/')
  })

  it('应该处理相对路径', () => {
    expect(joinUrl('/api', 'users', '123'))
      .toBe('/api/users/123')
  })

  it('空数组应返回空字符串', () => {
    expect(joinUrl()).toBe('')
  })

  it('应该过滤空值', () => {
    expect(joinUrl('https://example.com', '', 'api'))
      .toBe('https://example.com/api')
  })
})

describe('normalizeUrl', () => {
  it('应该移除多余斜杠', () => {
    expect(normalizeUrl('https://example.com//api///users/'))
      .toBe('https://example.com/api/users/')
  })

  it('应该处理 . 和 ..', () => {
    expect(normalizeUrl('https://example.com/api/../users'))
      .toBe('https://example.com/users')
    expect(normalizeUrl('https://example.com/api/./users'))
      .toBe('https://example.com/api/users')
  })

  it('应该处理相对路径', () => {
    expect(normalizeUrl('/api/./users/../posts'))
      .toBe('/api/posts')
  })

  it('应该保留查询字符串和哈希', () => {
    expect(normalizeUrl('https://example.com//api?query=1#hash'))
      .toBe('https://example.com/api?query=1#hash')
  })

  it('空字符串应返回空字符串', () => {
    expect(normalizeUrl('')).toBe('')
  })
})

describe('removeTrailingSlash', () => {
  it('应该移除尾部斜杠', () => {
    expect(removeTrailingSlash('https://example.com/')).toBe('https://example.com')
    expect(removeTrailingSlash('https://example.com/path/')).toBe('https://example.com/path')
  })

  it('无尾部斜杠应保持不变', () => {
    expect(removeTrailingSlash('https://example.com')).toBe('https://example.com')
  })

  it('单斜杠路径应保持不变', () => {
    expect(removeTrailingSlash('/')).toBe('/')
  })

  it('应该保留查询字符串和哈希', () => {
    expect(removeTrailingSlash('/path/?query=1#hash')).toBe('/path?query=1#hash')
  })
})

describe('ensureTrailingSlash', () => {
  it('应该添加尾部斜杠', () => {
    expect(ensureTrailingSlash('https://example.com')).toBe('https://example.com/')
    expect(ensureTrailingSlash('/path')).toBe('/path/')
  })

  it('已有尾部斜杠应保持不变', () => {
    expect(ensureTrailingSlash('https://example.com/')).toBe('https://example.com/')
  })

  it('空字符串应返回斜杠', () => {
    expect(ensureTrailingSlash('')).toBe('/')
  })

  it('应该保留查询字符串和哈希', () => {
    expect(ensureTrailingSlash('/path?query=1#hash')).toBe('/path/?query=1#hash')
  })
})

describe('removeLeadingSlash', () => {
  it('应该移除开头斜杠', () => {
    expect(removeLeadingSlash('/path/to/page')).toBe('path/to/page')
    expect(removeLeadingSlash('///path')).toBe('path')
  })

  it('无开头斜杠应保持不变', () => {
    expect(removeLeadingSlash('path')).toBe('path')
  })

  it('空字符串应返回空字符串', () => {
    expect(removeLeadingSlash('')).toBe('')
  })
})

describe('ensureLeadingSlash', () => {
  it('应该添加开头斜杠', () => {
    expect(ensureLeadingSlash('path/to/page')).toBe('/path/to/page')
  })

  it('已有开头斜杠应保持不变', () => {
    expect(ensureLeadingSlash('/path')).toBe('/path')
  })

  it('空字符串应返回斜杠', () => {
    expect(ensureLeadingSlash('')).toBe('/')
  })
})

describe('buildUrl', () => {
  it('应该构建完整 URL', () => {
    expect(buildUrl('https://example.com', '/api/users', { page: 1, limit: 10 }))
      .toBe('https://example.com/api/users?page=1&limit=10')
  })

  it('应该支持哈希', () => {
    expect(buildUrl('https://example.com', '/page', null, 'section'))
      .toBe('https://example.com/page#section')
  })

  it('应该支持带 # 前缀的哈希', () => {
    expect(buildUrl('https://example.com', '/page', null, '#section'))
      .toBe('https://example.com/page#section')
  })

  it('应该支持数组查询参数', () => {
    expect(buildUrl('https://example.com', '/api', { ids: [1, 2, 3] }))
      .toBe('https://example.com/api?ids=1&ids=2&ids=3')
  })

  it('无路径时只返回基础 URL', () => {
    expect(buildUrl('https://example.com')).toBe('https://example.com')
  })

  it('空查询对象不应添加 ?', () => {
    expect(buildUrl('https://example.com', '/api', {}))
      .toBe('https://example.com/api')
  })
})

describe('safeDecodeURIComponent', () => {
  it('应该正确解码', () => {
    expect(safeDecodeURIComponent('%E4%B8%AD%E6%96%87')).toBe('中文')
    expect(safeDecodeURIComponent('hello%20world')).toBe('hello world')
  })

  it('无效编码应返回原字符串', () => {
    expect(safeDecodeURIComponent('%invalid%')).toBe('%invalid%')
    expect(safeDecodeURIComponent('%')).toBe('%')
  })

  it('空字符串应返回空字符串', () => {
    expect(safeDecodeURIComponent('')).toBe('')
  })
})

describe('safeEncodeURIComponent', () => {
  it('应该正确编码', () => {
    expect(safeEncodeURIComponent('中文')).toBe('%E4%B8%AD%E6%96%87')
    expect(safeEncodeURIComponent('hello world')).toBe('hello%20world')
  })

  it('空字符串应返回空字符串', () => {
    expect(safeEncodeURIComponent('')).toBe('')
  })
})

describe('isSameOrigin', () => {
  it('应该识别同源 URL', () => {
    expect(isSameOrigin('https://example.com/a', 'https://example.com/b')).toBe(true)
    expect(isSameOrigin('https://example.com:443/a', 'https://example.com/b')).toBe(true)
  })

  it('应该识别不同源 URL', () => {
    expect(isSameOrigin('https://example.com', 'https://sub.example.com')).toBe(false)
    expect(isSameOrigin('https://example.com', 'http://example.com')).toBe(false)
    expect(isSameOrigin('https://example.com', 'https://example.com:8080')).toBe(false)
  })

  it('无效 URL 应返回 false', () => {
    expect(isSameOrigin('not a url', 'https://example.com')).toBe(false)
    expect(isSameOrigin('https://example.com', 'not a url')).toBe(false)
  })
})

describe('toAbsoluteUrl', () => {
  it('应该转换相对路径', () => {
    expect(toAbsoluteUrl('/path', 'https://example.com'))
      .toBe('https://example.com/path')
  })

  it('应该处理 .. 路径', () => {
    // URL API 的 .. 解析是相对于基础 URL 的路径目录
    // /api/users 的目录是 /api/，所以 ../other 会解析为 /other
    expect(toAbsoluteUrl('../other', 'https://example.com/api/users'))
      .toBe('https://example.com/other')
  })

  it('绝对 URL 应保持不变', () => {
    expect(toAbsoluteUrl('https://other.com', 'https://example.com'))
      .toBe('https://other.com/')
  })

  it('空 URL 应返回基础 URL', () => {
    expect(toAbsoluteUrl('', 'https://example.com')).toBe('https://example.com')
  })
})

describe('getRelativePath', () => {
  it('应该计算同级路径', () => {
    // from: /a/b -> to: /a/c，需要先 .. 回到 /a，再进入 c
    expect(getRelativePath('https://example.com/a/b', 'https://example.com/a/c'))
      .toBe('../c')
  })

  it('应该计算子路径', () => {
    expect(getRelativePath('https://example.com/a', 'https://example.com/a/b/c'))
      .toBe('b/c')
  })

  it('应该计算向上路径', () => {
    expect(getRelativePath('https://example.com/a/b/c', 'https://example.com/a'))
      .toBe('../..')
  })

  it('不同源应返回目标 URL', () => {
    expect(getRelativePath('https://example.com/a', 'https://other.com/b'))
      .toBe('https://other.com/b')
  })

  it('应该保留查询字符串和哈希', () => {
    // from: /a -> to: /b，需要先 .. 回到根，再进入 b
    expect(getRelativePath('https://example.com/a', 'https://example.com/b?query=1#hash'))
      .toBe('../b?query=1#hash')
  })

  it('相同路径应返回 .', () => {
    expect(getRelativePath('https://example.com/a/b', 'https://example.com/a/b'))
      .toBe('.')
  })
})
