import { describe, expect, it } from 'vitest'
import {
  getDomain,
  getRootDomain,
  getUrlExtension,
  getUrlFilename,
  isAbsoluteUrl,
  isRelativeUrl,
  isValidUrl,
  parseUrl,
} from '../../../src/utilities/url'

describe('parseUrl', () => {
  it('应该正确解析完整 URL', () => {
    const result = parseUrl('https://user:pass@example.com:8080/path/to/page?query=1#hash')

    expect(result).not.toBeNull()
    expect(result?.protocol).toBe('https:')
    expect(result?.hostname).toBe('example.com')
    expect(result?.port).toBe('8080')
    expect(result?.pathname).toBe('/path/to/page')
    expect(result?.search).toBe('?query=1')
    expect(result?.hash).toBe('#hash')
    expect(result?.auth).toBe('user:pass')
    expect(result?.origin).toBe('https://example.com:8080')
  })

  it('应该正确解析简单 URL', () => {
    const result = parseUrl('https://example.com')

    expect(result?.hostname).toBe('example.com')
    expect(result?.port).toBe('')
    expect(result?.pathname).toBe('/')
    expect(result?.search).toBe('')
    expect(result?.hash).toBe('')
  })

  it('应该支持基础 URL 解析相对路径', () => {
    const result = parseUrl('/path/to/page', 'https://example.com')

    expect(result?.href).toBe('https://example.com/path/to/page')
    expect(result?.pathname).toBe('/path/to/page')
  })

  it('无效 URL 应返回 null', () => {
    expect(parseUrl('not a url')).toBeNull()
    expect(parseUrl('')).toBeNull()
  })

  it('应该正确处理只有用户名的认证信息', () => {
    const result = parseUrl('https://user@example.com')

    expect(result?.auth).toBe('user')
  })
})

describe('isValidUrl', () => {
  it('应该识别有效 URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://localhost:3000')).toBe(true)
    expect(isValidUrl('ftp://files.example.com')).toBe(true)
    expect(isValidUrl('file:///path/to/file')).toBe(true)
  })

  it('应该拒绝无效 URL', () => {
    expect(isValidUrl('not a url')).toBe(false)
    expect(isValidUrl('/path/to/page')).toBe(false)
    expect(isValidUrl('')).toBe(false)
  })
})

describe('isAbsoluteUrl', () => {
  it('应该识别绝对 URL', () => {
    expect(isAbsoluteUrl('https://example.com')).toBe(true)
    expect(isAbsoluteUrl('http://example.com')).toBe(true)
    expect(isAbsoluteUrl('ftp://example.com')).toBe(true)
    expect(isAbsoluteUrl('//example.com/path')).toBe(true)
  })

  it('应该识别相对 URL', () => {
    expect(isAbsoluteUrl('/path/to/page')).toBe(false)
    expect(isAbsoluteUrl('./page')).toBe(false)
    expect(isAbsoluteUrl('../page')).toBe(false)
    expect(isAbsoluteUrl('page.html')).toBe(false)
  })

  it('空值应返回 false', () => {
    expect(isAbsoluteUrl('')).toBe(false)
  })
})

describe('isRelativeUrl', () => {
  it('应该与 isAbsoluteUrl 相反', () => {
    expect(isRelativeUrl('/path/to/page')).toBe(true)
    expect(isRelativeUrl('./page')).toBe(true)
    expect(isRelativeUrl('https://example.com')).toBe(false)
  })

  it('空值应返回 false', () => {
    expect(isRelativeUrl('')).toBe(false)
  })
})

describe('getDomain', () => {
  it('应该提取域名', () => {
    expect(getDomain('https://example.com/path')).toBe('example.com')
    expect(getDomain('https://sub.example.com')).toBe('sub.example.com')
    expect(getDomain('https://example.com:8080')).toBe('example.com')
  })

  it('无效 URL 应返回空字符串', () => {
    expect(getDomain('not a url')).toBe('')
    expect(getDomain('')).toBe('')
  })
})

describe('getRootDomain', () => {
  it('应该提取根域名', () => {
    expect(getRootDomain('https://sub.example.com')).toBe('example.com')
    expect(getRootDomain('https://a.b.c.example.com')).toBe('example.com')
    expect(getRootDomain('https://example.com')).toBe('example.com')
  })

  it('应该正确处理复合顶级域名', () => {
    expect(getRootDomain('https://sub.example.co.uk')).toBe('example.co.uk')
    expect(getRootDomain('https://shop.example.com.cn')).toBe('example.com.cn')
    expect(getRootDomain('https://www.example.org.uk')).toBe('example.org.uk')
  })

  it('无效 URL 应返回空字符串', () => {
    expect(getRootDomain('not a url')).toBe('')
  })
})

describe('getUrlExtension', () => {
  it('应该提取文件扩展名', () => {
    expect(getUrlExtension('https://example.com/file.pdf')).toBe('pdf')
    expect(getUrlExtension('https://example.com/file.tar.gz')).toBe('gz')
    expect(getUrlExtension('https://example.com/File.PDF')).toBe('pdf')
  })

  it('无扩展名应返回空字符串', () => {
    expect(getUrlExtension('https://example.com/path/')).toBe('')
    expect(getUrlExtension('https://example.com/file')).toBe('')
    expect(getUrlExtension('https://example.com/.htaccess')).toBe('')
  })

  it('应该忽略查询参数', () => {
    expect(getUrlExtension('https://example.com/file.pdf?v=1')).toBe('pdf')
  })
})

describe('getUrlFilename', () => {
  it('应该提取文件名（含扩展名）', () => {
    expect(getUrlFilename('https://example.com/path/file.pdf')).toBe('file.pdf')
    expect(getUrlFilename('https://example.com/file.tar.gz')).toBe('file.tar.gz')
  })

  it('应该提取文件名（不含扩展名）', () => {
    expect(getUrlFilename('https://example.com/path/file.pdf', false)).toBe('file')
    expect(getUrlFilename('https://example.com/file.tar.gz', false)).toBe('file.tar')
  })

  it('路径以斜杠结尾应返回空字符串', () => {
    expect(getUrlFilename('https://example.com/path/')).toBe('')
    expect(getUrlFilename('https://example.com/')).toBe('')
  })

  it('无扩展名文件', () => {
    expect(getUrlFilename('https://example.com/README', false)).toBe('README')
    expect(getUrlFilename('https://example.com/README')).toBe('README')
  })
})
