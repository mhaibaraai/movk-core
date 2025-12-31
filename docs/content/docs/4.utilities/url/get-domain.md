---
title: getDomain
description: 获取 URL 的域名部分
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`getDomain` 函数用于获取 URL 的域名部分。

```ts
import { getDomain } from '@movk/core'

getDomain('https://sub.example.com/path') // 'sub.example.com'
getDomain('https://example.com:8080') // 'example.com'
```

## API

### `getDomain(url)`{lang="ts-type"}

获取 URL 的域名部分。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  域名,解析失败返回空字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
