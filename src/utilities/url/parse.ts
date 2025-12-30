interface ParsedUrl {
  /** 完整的原始 URL */
  href: string
  /** 协议 (http:, https:, etc.) */
  protocol: string
  /** 主机名 + 端口 */
  host: string
  /** 主机名 */
  hostname: string
  /** 端口号 */
  port: string
  /** 路径部分 */
  pathname: string
  /** 查询字符串 (包含 ?) */
  search: string
  /** 哈希部分 (包含 #) */
  hash: string
  /** 用户认证信息 (user:pass) */
  auth: string
  /** 源 (protocol + host) */
  origin: string
}

/**
 * 解析 URL 字符串为结构化对象
 *
 * @category URL
 * @param url 要解析的 URL 字符串
 * @param base 可选的基础 URL，用于解析相对路径
 * @returns 解析后的 URL 对象，解析失败返回 null
 * @example
 * ```ts
 * parseUrl('https://example.com:8080/path?query=1#hash')
 * // {
 * //   href: 'https://example.com:8080/path?query=1#hash',
 * //   protocol: 'https:',
 * //   host: 'example.com:8080',
 * //   hostname: 'example.com',
 * //   port: '8080',
 * //   pathname: '/path',
 * //   search: '?query=1',
 * //   hash: '#hash',
 * //   auth: '',
 * //   origin: 'https://example.com:8080'
 * // }
 *
 * parseUrl('/path', 'https://example.com')
 * // 解析相对 URL
 * ```
 */
export function parseUrl(url: string, base?: string): ParsedUrl | null {
  if (!url)
    return null

  try {
    const parsed = base ? new URL(url, base) : new URL(url)
    return {
      href: parsed.href,
      protocol: parsed.protocol,
      host: parsed.host,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      auth: parsed.username ? `${parsed.username}${parsed.password ? `:${parsed.password}` : ''}` : '',
      origin: parsed.origin,
    }
  }
  catch {
    return null
  }
}

/**
 * 检查字符串是否为有效的 URL
 *
 * @category URL
 * @param url 要检查的字符串
 * @returns 是否为有效 URL
 * @example
 * ```ts
 * isValidUrl('https://example.com') // true
 * isValidUrl('not a url') // false
 * isValidUrl('ftp://files.example.com') // true
 * ```
 */
export function isValidUrl(url: string): boolean {
  if (!url)
    return false

  try {
    return Boolean(new URL(url))
  }
  catch {
    return false
  }
}

/**
 * 检查 URL 是否为绝对路径
 *
 * @category URL
 * @param url 要检查的 URL
 * @returns 是否为绝对路径
 * @example
 * ```ts
 * isAbsoluteUrl('https://example.com') // true
 * isAbsoluteUrl('/path/to/page') // false
 * isAbsoluteUrl('//example.com/path') // true (protocol-relative)
 * ```
 */
export function isAbsoluteUrl(url: string): boolean {
  if (!url)
    return false

  // 协议相对 URL (//example.com)
  if (url.startsWith('//'))
    return true

  // 检查是否包含协议
  return /^[a-z][a-z0-9+.-]*:/i.test(url)
}

/**
 * 检查 URL 是否为相对路径
 *
 * @category URL
 * @param url 要检查的 URL
 * @returns 是否为相对路径
 * @example
 * ```ts
 * isRelativeUrl('/path/to/page') // true
 * isRelativeUrl('./page') // true
 * isRelativeUrl('../page') // true
 * isRelativeUrl('https://example.com') // false
 * ```
 */
export function isRelativeUrl(url: string): boolean {
  if (!url)
    return false

  return !isAbsoluteUrl(url)
}

/**
 * 获取 URL 的域名部分
 *
 * @category URL
 * @param url URL 字符串
 * @returns 域名，解析失败返回空字符串
 * @example
 * ```ts
 * getDomain('https://sub.example.com/path') // 'sub.example.com'
 * getDomain('https://example.com:8080') // 'example.com'
 * ```
 */
export function getDomain(url: string): string {
  const parsed = parseUrl(url)
  return parsed?.hostname ?? ''
}

/**
 * 获取 URL 的根域名（顶级域名 + 二级域名）
 *
 * @category URL
 * @param url URL 字符串
 * @returns 根域名，解析失败返回空字符串
 * @example
 * ```ts
 * getRootDomain('https://sub.example.com') // 'example.com'
 * getRootDomain('https://a.b.example.co.uk') // 'example.co.uk'
 * ```
 */
export function getRootDomain(url: string): string {
  const hostname = getDomain(url)
  if (!hostname)
    return ''

  // 常见的复合顶级域名
  const compoundTlds = [
    'co.uk',
    'co.jp',
    'co.kr',
    'co.nz',
    'co.za',
    'co.in',
    'com.au',
    'com.br',
    'com.cn',
    'com.tw',
    'com.hk',
    'com.sg',
    'org.uk',
    'org.au',
    'net.au',
    'net.cn',
    'gov.uk',
    'gov.au',
    'edu.au',
    'edu.cn',
    'ac.uk',
    'ac.jp',
  ]

  const parts = hostname.split('.')

  // 检查是否为复合顶级域名
  if (parts.length >= 3) {
    const lastTwo = parts.slice(-2).join('.')
    if (compoundTlds.includes(lastTwo)) {
      return parts.slice(-3).join('.')
    }
  }

  // 返回最后两部分
  return parts.length >= 2 ? parts.slice(-2).join('.') : hostname
}

/**
 * 获取 URL 的文件扩展名
 *
 * @category URL
 * @param url URL 字符串
 * @returns 文件扩展名（不含点），无扩展名返回空字符串
 * @example
 * ```ts
 * getUrlExtension('https://example.com/file.pdf') // 'pdf'
 * getUrlExtension('https://example.com/file.tar.gz') // 'gz'
 * getUrlExtension('https://example.com/path/') // ''
 * ```
 */
export function getUrlExtension(url: string): string {
  const parsed = parseUrl(url)
  if (!parsed)
    return ''

  const pathname = parsed.pathname
  const lastSegment = pathname.split('/').pop() || ''
  const dotIndex = lastSegment.lastIndexOf('.')

  if (dotIndex === -1 || dotIndex === 0)
    return ''

  return lastSegment.slice(dotIndex + 1).toLowerCase()
}

/**
 * 获取 URL 的文件名
 *
 * @category URL
 * @param url URL 字符串
 * @param includeExtension 是否包含扩展名，默认 true
 * @returns 文件名
 * @example
 * ```ts
 * getUrlFilename('https://example.com/path/file.pdf') // 'file.pdf'
 * getUrlFilename('https://example.com/path/file.pdf', false) // 'file'
 * getUrlFilename('https://example.com/path/') // ''
 * ```
 */
export function getUrlFilename(url: string, includeExtension = true): string {
  const parsed = parseUrl(url)
  if (!parsed)
    return ''

  const pathname = parsed.pathname
  const lastSegment = pathname.split('/').pop() || ''

  if (!lastSegment || lastSegment === '/')
    return ''

  if (includeExtension)
    return lastSegment

  const dotIndex = lastSegment.lastIndexOf('.')
  return dotIndex > 0 ? lastSegment.slice(0, dotIndex) : lastSegment
}
