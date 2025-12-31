---
title: appendQueryParam
description: 追加查询参数(不覆盖已有同名参数)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`appendQueryParam` 函数用于追加查询参数(不覆盖已有同名参数)。

```ts
import { appendQueryParam } from '@movk/core'

appendQueryParam('https://example.com?tag=a', 'tag', 'b')
// 'https://example.com?tag=a&tag=b'
```

## API

### `appendQueryParam(url, key, value)`{lang="ts-type"}

追加查询参数(不覆盖已有同名参数)。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="key" type="string" required}
  参数名。
  ::

  ::field{name="value" type="QueryParamValue" required}
  参数值。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  新的 URL 字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
