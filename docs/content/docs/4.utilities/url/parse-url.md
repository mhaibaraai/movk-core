---
title: parseUrl
description: 解析 URL 字符串为结构化对象
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`parseUrl` 函数用于解析 URL 字符串为结构化对象。

```ts
import { parseUrl } from '@movk/core'

parseUrl('https://example.com:8080/path?query=1#hash')
// {
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

parseUrl('/path', 'https://example.com')
// 解析相对 URL
```

## API

### `parseUrl(url, base?)`{lang="ts-type"}

解析 URL 字符串为结构化对象。

### 参数

::field-group
  ::field{name="url" type="string" required}
  要解析的 URL 字符串。
  ::

  ::field{name="base" type="string"}
  可选的基础 URL，用于解析相对路径。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="ParsedUrl | null"}
  解析后的 URL 对象，解析失败返回 `null`。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
