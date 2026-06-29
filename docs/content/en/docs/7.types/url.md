---
title: URL
description: A set of TypeScript type definitions describing URL structure and parse results, covering fields such as protocol, host, and pathname.
seo:
  title: URL Types
  description: Reference for @movk/core URL types, including the parsed URL shape and the query parameter value and record types used by URL utilities.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/url.ts
---

## `ParsedUrl`

The URL parse result interface.

```ts
interface ParsedUrl {
  /** The full original URL */
  href: string
  /** Protocol (http:, https:, etc.) */
  protocol: string
  /** Hostname + port */
  host: string
  /** Hostname */
  hostname: string
  /** Port number */
  port: string
  /** Pathname portion */
  pathname: string
  /** Query string (includes ?) */
  search: string
  /** Hash portion (includes #) */
  hash: string
  /** User authentication info (user:pass) */
  auth: string
  /** Origin (protocol + host) */
  origin: string
}
```

## Usage

```ts
import type { ParsedUrl } from '@movk/core'
import { parseUrl } from '@movk/core'

const result: ParsedUrl | null = parseUrl('https://example.com/path')
```

## `QueryParamValue`

Query parameter value type.

```ts
type QueryParamValue = string | number | boolean | null | undefined
```

## Usage

```ts
import type { QueryParamValue } from '@movk/core'

const value: QueryParamValue = 'hello'
const numValue: QueryParamValue = 123
const boolValue: QueryParamValue = true
```

## `QueryParams`

Query parameters object type.

```ts
type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>
```

## Usage

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
