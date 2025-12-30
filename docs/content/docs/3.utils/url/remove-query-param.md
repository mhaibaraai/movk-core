---
title: removeQueryParam
description: 删除 URL 的指定查询参数。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `removeQueryParam`

删除 URL 中指定的查询参数。

### 用法

```ts
import { removeQueryParam } from '@movk/core'

removeQueryParam('https://example.com?page=1&sort=name', 'page')
// => 'https://example.com/?sort=name'

// 删除所有同名参数
removeQueryParam('https://example.com?tag=a&tag=b', 'tag')
// => 'https://example.com/'

// 删除唯一参数
removeQueryParam('https://example.com?page=1', 'page')
// => 'https://example.com/'
```

### API

`removeQueryParam(url: string, key: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
  ::field{name="key" type="string" required}
  要删除的参数名。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  新的 URL 字符串。
  ::
::

## 相关

- [hasQueryParam](/docs/utils/url/has-query-param) - 检查参数存在

## Changelog

:commit-changelog{prefix="utils/url"}
