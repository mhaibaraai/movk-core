---
title: getDomain
description: 获取 URL 的域名部分。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `getDomain`

获取 URL 的域名（hostname）部分。

### 用法

```ts
import { getDomain } from '@movk/core'

getDomain('https://example.com/path') // => 'example.com'
getDomain('https://sub.example.com') // => 'sub.example.com'
getDomain('https://example.com:8080') // => 'example.com'
getDomain('not a url') // => ''
```

### API

`getDomain(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  域名，解析失败返回空字符串。
  ::
::

## 相关

- [getRootDomain](/docs/utils/url/get-root-domain) - 获取根域名

## Changelog

:commit-changelog{prefix="utils/url"}
