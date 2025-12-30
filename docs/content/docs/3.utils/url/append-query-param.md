---
title: appendQueryParam
description: 追加查询参数（不覆盖已有同名参数）。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `appendQueryParam`

追加查询参数到 URL，不会覆盖已有的同名参数。

### 用法

```ts
import { appendQueryParam } from '@movk/core'

appendQueryParam('https://example.com?tag=a', 'tag', 'b')
// => 'https://example.com/?tag=a&tag=b'

appendQueryParam('/path?a=1', 'b', 2)
// => '/path?a=1&b=2'

// null 或 undefined 值不会追加
appendQueryParam('https://example.com', 'a', null)
// => 'https://example.com'
```

### API

`appendQueryParam(url: string, key: string, value: QueryParamValue): string`{lang="ts-type"}

#### 参数

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

#### 返回值

::field-group
  ::field{name="string"}
  新的 URL 字符串。
  ::
::

## 相关

- [setQueryParam](/docs/utils/url/set-query-param) - 设置参数（覆盖）

## Changelog

:commit-changelog{prefix="utils/url"}
