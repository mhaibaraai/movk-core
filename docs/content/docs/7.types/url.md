---
title: URL
description: URL 相关的类型定义。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/url.ts
---

## `ParsedUrl`

URL 解析结果接口。

```ts
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
```

### 用法

```ts
import type { ParsedUrl } from '@movk/core'
import { parseUrl } from '@movk/core'

const result: ParsedUrl | null = parseUrl('https://example.com/path')
```

## `QueryParamValue`

查询参数值类型。

```ts
type QueryParamValue = string | number | boolean | null | undefined
```

### 用法

```ts
import type { QueryParamValue } from '@movk/core'

const value: QueryParamValue = 'hello'
const numValue: QueryParamValue = 123
const boolValue: QueryParamValue = true
```

## `QueryParams`

查询参数对象类型。

```ts
type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>
```

### 用法

```ts
import type { QueryParams } from '@movk/core'

const params: QueryParams = {
  page: 1,
  limit: 10,
  tags: ['a', 'b', 'c'],
  active: true,
}
```

## Changelog

:commit-changelog{prefix="types/url"}
