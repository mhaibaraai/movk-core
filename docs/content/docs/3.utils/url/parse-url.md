---
title: parseUrl
description: 解析 URL 字符串为结构化对象。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `parseUrl`

解析 URL 字符串为结构化对象，包含协议、域名、端口、路径、查询参数等信息。

### 用法

```ts
import { parseUrl } from '@movk/core'

parseUrl('https://example.com:8080/path?query=1#hash')
// => {
//   href: 'https://example.com:8080/path?query=1#hash',
//   protocol: 'https:',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path',
//   search: '?query=1',
//   hash: '#hash',
//   auth: '',
//   origin: 'https://example.com:8080'
// }

// 解析相对路径
parseUrl('/path/to/page', 'https://example.com')
// => { href: 'https://example.com/path/to/page', ... }

// 无效 URL 返回 null
parseUrl('not a url') // => null
```

### API

`parseUrl(url: string, base?: string): ParsedUrl | null`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  要解析的 URL 字符串。
  ::
  ::field{name="base" type="string"}
  可选的基础 URL，用于解析相对路径。
  ::
::

#### 返回值

::field-group
  ::field{name="ParsedUrl | null"}
  解析后的 URL 对象，解析失败返回 `null`。
  ::
::

## Changelog

:commit-changelog{prefix="utils/url"}
