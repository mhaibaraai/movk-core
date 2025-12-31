import type { QueryParams, QueryParamValue } from '../../types'

/**
 * 解析 URL 查询字符串为对象
 *
 * @category URL
 * @param search 查询字符串（可带或不带 ?）
 * @returns 解析后的查询参数对象
 * @example
 * ```ts
 * parseQuery('?name=John&age=30')
 * // { name: 'John', age: '30' }
 *
 * parseQuery('tags=a&tags=b&tags=c')
 * // { tags: ['a', 'b', 'c'] }
 *
 * parseQuery('encoded=%E4%B8%AD%E6%96%87')
 * // { encoded: '中文' }
 * ```
 */
export function parseQuery(search: string): Record<string, string | string[]> {
  if (!search)
    return {}

  // 移除开头的 ?
  const queryString = search.startsWith('?') ? search.slice(1) : search
  if (!queryString)
    return {}

  const result: Record<string, string | string[]> = {}
  const params = new URLSearchParams(queryString)

  for (const [key, value] of params.entries()) {
    const existing = result[key]
    if (existing !== undefined) {
      if (Array.isArray(existing)) {
        existing.push(value)
      }
      else {
        result[key] = [existing, value]
      }
    }
    else {
      result[key] = value
    }
  }

  return result
}

/**
 * 将对象序列化为查询字符串
 *
 * @category URL
 * @param params 查询参数对象
 * @param options 序列化选项
 * @param options.skipNull 跳过 null 和 undefined 值
 * @param options.skipEmpty 跳过空字符串
 * @param options.arrayFormat 数组格式: 'repeat' (默认), 'bracket', 'index', 'comma'
 * @returns 查询字符串（不含 ?）
 * @example
 * ```ts
 * stringifyQuery({ name: 'John', age: 30 })
 * // 'name=John&age=30'
 *
 * stringifyQuery({ tags: ['a', 'b', 'c'] })
 * // 'tags=a&tags=b&tags=c'
 *
 * stringifyQuery({ name: '中文' })
 * // 'name=%E4%B8%AD%E6%96%87'
 *
 * stringifyQuery({ a: null, b: undefined, c: '' }, { skipNull: true, skipEmpty: true })
 * // ''
 * ```
 */
export function stringifyQuery(
  params: QueryParams,
  options: {
    /** 跳过 null 和 undefined 值 */
    skipNull?: boolean
    /** 跳过空字符串 */
    skipEmpty?: boolean
    /** 数组格式: 'repeat' (默认), 'bracket', 'index', 'comma' */
    arrayFormat?: 'repeat' | 'bracket' | 'index' | 'comma'
  } = {},
): string {
  const { skipNull = false, skipEmpty = false, arrayFormat = 'repeat' } = options

  const parts: string[] = []

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      if (skipNull)
        continue
      parts.push(`${encodeURIComponent(key)}=`)
      continue
    }

    if (Array.isArray(value)) {
      const filtered = value.filter((v) => {
        if (v === null || v === undefined)
          return !skipNull
        if (v === '')
          return !skipEmpty
        return true
      })

      if (filtered.length === 0)
        continue

      switch (arrayFormat) {
        case 'bracket':
          for (const v of filtered) {
            parts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(String(v ?? ''))}`)
          }
          break
        case 'index':
          filtered.forEach((v, i) => {
            parts.push(`${encodeURIComponent(key)}[${i}]=${encodeURIComponent(String(v ?? ''))}`)
          })
          break
        case 'comma':
          parts.push(`${encodeURIComponent(key)}=${filtered.map(v => encodeURIComponent(String(v ?? ''))).join(',')}`)
          break
        default: // repeat
          for (const v of filtered) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v ?? ''))}`)
          }
      }
      continue
    }

    const strValue = String(value)
    if (strValue === '' && skipEmpty)
      continue

    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(strValue)}`)
  }

  return parts.join('&')
}

/**
 * 从 URL 获取指定查询参数的值
 *
 * @category URL
 * @param url URL 字符串
 * @param key 参数名
 * @returns 参数值，不存在返回 null
 * @example
 * ```ts
 * getQueryParam('https://example.com?name=John&age=30', 'name')
 * // 'John'
 *
 * getQueryParam('https://example.com?tags=a&tags=b', 'tags')
 * // 'a' (返回第一个值)
 *
 * getQueryParam('https://example.com', 'name')
 * // null
 * ```
 */
export function getQueryParam(url: string, key: string): string | null {
  if (!url || !key)
    return null

  try {
    const parsed = new URL(url, 'http://localhost')
    return parsed.searchParams.get(key)
  }
  catch {
    // 尝试从纯查询字符串解析
    const queryIndex = url.indexOf('?')
    if (queryIndex === -1)
      return null

    const params = parseQuery(url.slice(queryIndex))
    const value = params[key]
    if (Array.isArray(value))
      return value[0] ?? null
    return value ?? null
  }
}

/**
 * 从 URL 获取所有指定查询参数的值（用于多值参数）
 *
 * @category URL
 * @param url URL 字符串
 * @param key 参数名
 * @returns 参数值数组
 * @example
 * ```ts
 * getQueryParams('https://example.com?tags=a&tags=b&tags=c', 'tags')
 * // ['a', 'b', 'c']
 *
 * getQueryParams('https://example.com?name=John', 'name')
 * // ['John']
 *
 * getQueryParams('https://example.com', 'name')
 * // []
 * ```
 */
export function getQueryParams(url: string, key: string): string[] {
  if (!url || !key)
    return []

  try {
    const parsed = new URL(url, 'http://localhost')
    return parsed.searchParams.getAll(key)
  }
  catch {
    const queryIndex = url.indexOf('?')
    if (queryIndex === -1)
      return []

    const params = parseQuery(url.slice(queryIndex))
    const value = params[key]
    if (!value)
      return []
    return Array.isArray(value) ? value : [value]
  }
}

/**
 * 设置 URL 的查询参数
 *
 * @category URL
 * @param url URL 字符串
 * @param key 参数名
 * @param value 参数值
 * @returns 新的 URL 字符串
 * @example
 * ```ts
 * setQueryParam('https://example.com', 'page', 1)
 * // 'https://example.com?page=1'
 *
 * setQueryParam('https://example.com?page=1', 'page', 2)
 * // 'https://example.com?page=2'
 *
 * setQueryParam('https://example.com?page=1', 'sort', 'name')
 * // 'https://example.com?page=1&sort=name'
 * ```
 */
export function setQueryParam(url: string, key: string, value: QueryParamValue): string {
  if (!url || !key)
    return url

  try {
    const parsed = new URL(url)
    if (value === null || value === undefined) {
      parsed.searchParams.delete(key)
    }
    else {
      parsed.searchParams.set(key, String(value))
    }
    return parsed.toString()
  }
  catch {
    // 处理相对 URL 或无效 URL
    // 先分离哈希部分
    const hashIndex = url.indexOf('#')
    const hash = hashIndex !== -1 ? url.slice(hashIndex + 1) : ''
    const urlWithoutHash = hashIndex !== -1 ? url.slice(0, hashIndex) : url

    // 再分离查询字符串
    const queryIndex = urlWithoutHash.indexOf('?')
    const base = queryIndex !== -1 ? urlWithoutHash.slice(0, queryIndex) : urlWithoutHash
    const query = queryIndex !== -1 ? urlWithoutHash.slice(queryIndex + 1) : ''

    const params = parseQuery(query)
    if (value === null || value === undefined) {
      delete params[key]
    }
    else {
      params[key] = String(value)
    }

    const newQuery = stringifyQuery(params as QueryParams)
    let result = base
    if (newQuery)
      result += `?${newQuery}`
    if (hash)
      result += `#${hash}`
    return result
  }
}

/**
 * 批量设置 URL 的查询参数
 *
 * @category URL
 * @param url URL 字符串
 * @param params 要设置的参数对象
 * @returns 新的 URL 字符串
 * @example
 * ```ts
 * setQueryParams('https://example.com', { page: 1, limit: 10 })
 * // 'https://example.com?page=1&limit=10'
 *
 * setQueryParams('https://example.com?page=1', { page: 2, sort: 'name' })
 * // 'https://example.com?page=2&sort=name'
 * ```
 */
export function setQueryParams(url: string, params: QueryParams): string {
  let result = url
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      // 先删除已有的同名参数
      result = removeQueryParam(result, key)
      // 然后逐个添加
      for (const v of value) {
        result = appendQueryParam(result, key, v)
      }
    }
    else {
      result = setQueryParam(result, key, value)
    }
  }
  return result
}

/**
 * 追加查询参数（不覆盖已有同名参数）
 *
 * @category URL
 * @param url URL 字符串
 * @param key 参数名
 * @param value 参数值
 * @returns 新的 URL 字符串
 * @example
 * ```ts
 * appendQueryParam('https://example.com?tag=a', 'tag', 'b')
 * // 'https://example.com?tag=a&tag=b'
 * ```
 */
export function appendQueryParam(url: string, key: string, value: QueryParamValue): string {
  if (!url || !key || value === null || value === undefined)
    return url

  try {
    const parsed = new URL(url)
    parsed.searchParams.append(key, String(value))
    return parsed.toString()
  }
  catch {
    const [base, queryAndHash] = url.split('?')
    const [query, hash] = (queryAndHash || '').split('#')

    const separator = query ? '&' : ''
    const newParam = `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`

    let result = base || ''
    result += `?${query || ''}${separator}${newParam}`
    if (hash)
      result += `#${hash}`
    return result
  }
}

/**
 * 删除 URL 的指定查询参数
 *
 * @category URL
 * @param url URL 字符串
 * @param key 要删除的参数名
 * @returns 新的 URL 字符串
 * @example
 * ```ts
 * removeQueryParam('https://example.com?page=1&sort=name', 'page')
 * // 'https://example.com?sort=name'
 *
 * removeQueryParam('https://example.com?page=1', 'page')
 * // 'https://example.com'
 * ```
 */
export function removeQueryParam(url: string, key: string): string {
  if (!url || !key)
    return url

  try {
    const parsed = new URL(url)
    parsed.searchParams.delete(key)
    return parsed.toString()
  }
  catch {
    const [base, queryAndHash] = url.split('?')
    const [query, hash] = (queryAndHash || '').split('#')

    const params = parseQuery(query || '')
    delete params[key]

    const newQuery = stringifyQuery(params as QueryParams)
    let result = base || ''
    if (newQuery)
      result += `?${newQuery}`
    if (hash)
      result += `#${hash}`
    return result
  }
}

/**
 * 检查 URL 是否包含指定查询参数
 *
 * @category URL
 * @param url URL 字符串
 * @param key 参数名
 * @returns 是否包含该参数
 * @example
 * ```ts
 * hasQueryParam('https://example.com?page=1', 'page') // true
 * hasQueryParam('https://example.com?page=1', 'sort') // false
 * hasQueryParam('https://example.com?flag', 'flag') // true (无值参数)
 * ```
 */
export function hasQueryParam(url: string, key: string): boolean {
  if (!url || !key)
    return false

  try {
    const parsed = new URL(url, 'http://localhost')
    return parsed.searchParams.has(key)
  }
  catch {
    const queryIndex = url.indexOf('?')
    if (queryIndex === -1)
      return false

    const params = parseQuery(url.slice(queryIndex))
    return key in params
  }
}
