---
title: hasQueryParam
description: 检查 URL 是否包含指定查询参数
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`hasQueryParam` 函数用于检查 URL 是否包含指定查询参数。

```ts
import { hasQueryParam } from '@movk/core'

hasQueryParam('https://example.com?page=1', 'page') // true
hasQueryParam('https://example.com?page=1', 'sort') // false
hasQueryParam('https://example.com?flag', 'flag') // true (无值参数)
```

## API

### `hasQueryParam(url, key)`{lang="ts-type"}

检查 URL 是否包含指定查询参数。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="key" type="string" required}
  参数名。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否包含该参数。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
