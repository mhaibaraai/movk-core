---
title: getRootDomain
description: 获取 URL 的根域名。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `getRootDomain`

获取 URL 的根域名（顶级域名 + 二级域名），支持常见的复合顶级域名。

### 用法

```ts
import { getRootDomain } from '@movk/core'

getRootDomain('https://sub.example.com') // => 'example.com'
getRootDomain('https://a.b.c.example.com') // => 'example.com'

// 支持复合顶级域名
getRootDomain('https://sub.example.co.uk') // => 'example.co.uk'
getRootDomain('https://shop.example.com.cn') // => 'example.com.cn'
```

### API

`getRootDomain(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  根域名，解析失败返回空字符串。
  ::
::

## 相关

- [getDomain](/docs/utils/url/get-domain) - 获取完整域名

## Changelog

:commit-changelog{prefix="utils/url"}
