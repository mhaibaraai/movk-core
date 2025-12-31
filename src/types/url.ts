export interface ParsedUrl {
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
 * 查询参数值类型
 */
export type QueryParamValue = string | number | boolean | null | undefined

/**
 * 查询参数对象类型
 */
export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>
