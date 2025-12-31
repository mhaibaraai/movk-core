---
title: getRootDomain
description: 获取 URL 的根域名(顶级域名 + 二级域名)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`getRootDomain` 函数用于获取 URL 的根域名(顶级域名 + 二级域名)。

```ts
import { getRootDomain } from '@movk/core'

getRootDomain('https://sub.example.com') // 'example.com'
getRootDomain('https://a.b.example.co.uk') // 'example.co.uk'
```

## API

### `getRootDomain(url)`{lang="ts-type"}

获取 URL 的根域名(顶级域名 + 二级域名)。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  根域名,解析失败返回空字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
