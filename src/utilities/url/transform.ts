import type { QueryParams } from '../../types'
import { parseUrl } from './parse'
import { stringifyQuery } from './query'

/**
 * 连接 URL 路径片段
 *
 * @category URL
 * @param parts URL 片段
 * @returns 连接后的 URL
 * @example
 * ```ts
 * joinUrl('https://example.com', 'api', 'users')
 * // 'https://example.com/api/users'
 *
 * joinUrl('https://example.com/', '/api/', '/users/')
 * // 'https://example.com/api/users/'
 *
 * joinUrl('/api', 'users', '123')
 * // '/api/users/123'
 * ```
 */
export function joinUrl(...parts: string[]): string {
  if (parts.length === 0)
    return ''

  const filteredParts = parts.filter(p => p !== null && p !== undefined && p !== '')
  if (filteredParts.length === 0)
    return ''

  // 处理第一个片段，保留协议和开头的斜杠
  let result = filteredParts[0]!

  for (let i = 1; i < filteredParts.length; i++) {
    const part = filteredParts[i]!
    const hasTrailingSlash = result.endsWith('/')
    const hasLeadingSlash = part.startsWith('/')

    if (hasTrailingSlash && hasLeadingSlash) {
      result += part.slice(1)
    }
    else if (!hasTrailingSlash && !hasLeadingSlash) {
      result += `/${part}`
    }
    else {
      result += part
    }
  }

  return result
}

/**
 * 规范化 URL 路径（移除多余斜杠、处理 . 和 ..）
 *
 * @category URL
 * @param url URL 字符串
 * @returns 规范化后的 URL
 * @example
 * ```ts
 * normalizeUrl('https://example.com//api///users/')
 * // 'https://example.com/api/users/'
 *
 * normalizeUrl('https://example.com/api/../users')
 * // 'https://example.com/users'
 *
 * normalizeUrl('/api/./users/../posts')
 * // '/api/posts'
 * ```
 */
export function normalizeUrl(url: string): string {
  if (!url)
    return ''

  const parsed = parseUrl(url)

  if (parsed) {
    // 处理完整 URL
    const normalizedPath = normalizePath(parsed.pathname)
    return `${parsed.origin}${normalizedPath}${parsed.search}${parsed.hash}`
  }

  // 处理相对 URL 或路径
  const [pathPart, rest] = url.split(/(?=[?#])/)
  const normalizedPath = normalizePath(pathPart || '')
  return normalizedPath + (rest || '')
}

/**
 * 规范化路径部分
 */
function normalizePath(path: string): string {
  if (!path)
    return ''

  const hasLeadingSlash = path.startsWith('/')
  const hasTrailingSlash = path.endsWith('/') && path.length > 1

  // 移除多余斜杠并分割
  const segments = path.split('/').filter(Boolean)
  const result: string[] = []

  for (const segment of segments) {
    if (segment === '.')
      continue
    if (segment === '..') {
      result.pop()
      continue
    }
    result.push(segment)
  }

  let normalized = result.join('/')
  if (hasLeadingSlash)
    normalized = `/${normalized}`
  if (hasTrailingSlash && normalized !== '/')
    normalized += '/'

  return normalized || (hasLeadingSlash ? '/' : '')
}

/**
 * 移除 URL 的尾部斜杠
 *
 * @category URL
 * @param url URL 字符串
 * @returns 移除尾部斜杠后的 URL
 * @example
 * ```ts
 * removeTrailingSlash('https://example.com/') // 'https://example.com'
 * removeTrailingSlash('https://example.com/path/') // 'https://example.com/path'
 * removeTrailingSlash('https://example.com') // 'https://example.com'
 * ```
 */
export function removeTrailingSlash(url: string): string {
  if (!url)
    return ''

  // 保留查询字符串和哈希
  const [path, ...rest] = url.split(/(?=[?#])/)
  if (!path)
    return url

  const trimmed = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
  return trimmed + rest.join('')
}

/**
 * 确保 URL 以斜杠结尾
 *
 * @category URL
 * @param url URL 字符串
 * @returns 带尾部斜杠的 URL
 * @example
 * ```ts
 * ensureTrailingSlash('https://example.com') // 'https://example.com/'
 * ensureTrailingSlash('https://example.com/path') // 'https://example.com/path/'
 * ensureTrailingSlash('https://example.com/') // 'https://example.com/'
 * ```
 */
export function ensureTrailingSlash(url: string): string {
  if (!url)
    return '/'

  // 分离路径和查询字符串/哈希
  const queryOrHashIndex = url.search(/[?#]/)
  const path = queryOrHashIndex === -1 ? url : url.slice(0, queryOrHashIndex)
  const rest = queryOrHashIndex === -1 ? '' : url.slice(queryOrHashIndex)
  if (!path)
    return `/${rest}`

  const withSlash = path.endsWith('/') ? path : `${path}/`
  return withSlash + rest
}

/**
 * 移除 URL 的开头斜杠
 *
 * @category URL
 * @param url URL 或路径字符串
 * @returns 移除开头斜杠后的字符串
 * @example
 * ```ts
 * removeLeadingSlash('/path/to/page') // 'path/to/page'
 * removeLeadingSlash('///path') // 'path'
 * removeLeadingSlash('path') // 'path'
 * ```
 */
export function removeLeadingSlash(url: string): string {
  if (!url)
    return ''

  return url.replace(/^\/+/, '')
}

/**
 * 确保路径以斜杠开头
 *
 * @category URL
 * @param path 路径字符串
 * @returns 带开头斜杠的路径
 * @example
 * ```ts
 * ensureLeadingSlash('path/to/page') // '/path/to/page'
 * ensureLeadingSlash('/path') // '/path'
 * ```
 */
export function ensureLeadingSlash(path: string): string {
  if (!path)
    return '/'

  return path.startsWith('/') ? path : `/${path}`
}

/**
 * 构建完整 URL
 *
 * @category URL
 * @param base 基础 URL
 * @param path 路径部分
 * @param query 查询参数
 * @param hash 哈希部分
 * @returns 完整 URL
 * @example
 * ```ts
 * buildUrl('https://example.com', '/api/users', { page: 1, limit: 10 })
 * // 'https://example.com/api/users?page=1&limit=10'
 *
 * buildUrl('https://example.com', '/page', null, 'section')
 * // 'https://example.com/page#section'
 *
 * buildUrl('https://example.com', '/api', { ids: [1, 2, 3] })
 * // 'https://example.com/api?ids=1&ids=2&ids=3'
 * ```
 */
export function buildUrl(
  base: string,
  path?: string,
  query?: QueryParams | null,
  hash?: string,
): string {
  let url = base

  if (path) {
    url = joinUrl(url, path)
  }

  if (query && Object.keys(query).length > 0) {
    const queryString = stringifyQuery(query)
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString
    }
  }

  if (hash) {
    const hashPart = hash.startsWith('#') ? hash : `#${hash}`
    url += hashPart
  }

  return url
}

/**
 * 解码 URL 组件（安全版本，失败返回原字符串）
 *
 * @category URL
 * @param str 要解码的字符串
 * @returns 解码后的字符串
 * @example
 * ```ts
 * safeDecodeURIComponent('%E4%B8%AD%E6%96%87') // '中文'
 * safeDecodeURIComponent('hello%20world') // 'hello world'
 * safeDecodeURIComponent('%invalid%') // '%invalid%'
 * ```
 */
export function safeDecodeURIComponent(str: string): string {
  if (!str)
    return ''

  try {
    return decodeURIComponent(str)
  }
  catch {
    return str
  }
}

/**
 * 编码 URL 组件（安全版本）
 *
 * @category URL
 * @param str 要编码的字符串
 * @returns 编码后的字符串
 * @example
 * ```ts
 * safeEncodeURIComponent('中文') // '%E4%B8%AD%E6%96%87'
 * safeEncodeURIComponent('hello world') // 'hello%20world'
 * ```
 */
export function safeEncodeURIComponent(str: string): string {
  if (!str)
    return ''

  try {
    return encodeURIComponent(str)
  }
  catch {
    return str
  }
}

/**
 * 检查两个 URL 是否同源
 *
 * @category URL
 * @param url1 第一个 URL
 * @param url2 第二个 URL
 * @returns 是否同源
 * @example
 * ```ts
 * isSameOrigin('https://example.com/a', 'https://example.com/b') // true
 * isSameOrigin('https://example.com', 'https://sub.example.com') // false
 * isSameOrigin('https://example.com', 'http://example.com') // false
 * ```
 */
export function isSameOrigin(url1: string, url2: string): boolean {
  const parsed1 = parseUrl(url1)
  const parsed2 = parseUrl(url2)

  if (!parsed1 || !parsed2)
    return false

  return parsed1.origin === parsed2.origin
}

/**
 * 将相对 URL 转换为绝对 URL
 *
 * @category URL
 * @param relativeUrl 相对 URL
 * @param baseUrl 基础 URL
 * @returns 绝对 URL，转换失败返回原字符串
 * @example
 * ```ts
 * toAbsoluteUrl('/path', 'https://example.com')
 * // 'https://example.com/path'
 *
 * toAbsoluteUrl('../other', 'https://example.com/api/users')
 * // 'https://example.com/api/other'
 *
 * toAbsoluteUrl('https://other.com', 'https://example.com')
 * // 'https://other.com' (已是绝对URL，不变)
 * ```
 */
export function toAbsoluteUrl(relativeUrl: string, baseUrl: string): string {
  if (!relativeUrl)
    return baseUrl

  try {
    const absolute = new URL(relativeUrl, baseUrl)
    return absolute.href
  }
  catch {
    return relativeUrl
  }
}

/**
 * 获取两个 URL 之间的相对路径
 *
 * @category URL
 * @param from 起始 URL
 * @param to 目标 URL
 * @returns 相对路径
 * @example
 * ```ts
 * getRelativePath('https://example.com/a/b', 'https://example.com/a/c')
 * // '../c'
 *
 * getRelativePath('https://example.com/a', 'https://example.com/a/b/c')
 * // 'b/c'
 * ```
 */
export function getRelativePath(from: string, to: string): string {
  const fromParsed = parseUrl(from)
  const toParsed = parseUrl(to)

  if (!fromParsed || !toParsed)
    return to

  // 不同源直接返回目标 URL
  if (fromParsed.origin !== toParsed.origin)
    return to

  const fromParts = fromParsed.pathname.split('/').filter(Boolean)
  const toParts = toParsed.pathname.split('/').filter(Boolean)

  // 找到公共前缀
  let commonLength = 0
  const minLength = Math.min(fromParts.length, toParts.length)
  for (let i = 0; i < minLength; i++) {
    if (fromParts[i] === toParts[i]) {
      commonLength++
    }
    else {
      break
    }
  }

  // 计算需要向上的层数
  const upCount = fromParts.length - commonLength
  const remaining = toParts.slice(commonLength)

  const relativeParts: string[] = []
  for (let i = 0; i < upCount; i++) {
    relativeParts.push('..')
  }
  relativeParts.push(...remaining)

  let result = relativeParts.join('/') || '.'

  // 添加查询字符串和哈希
  if (toParsed.search)
    result += toParsed.search
  if (toParsed.hash)
    result += toParsed.hash

  return result
}
