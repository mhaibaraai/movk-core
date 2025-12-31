---
title: getQueryParams
description: 从 URL 获取所有指定查询参数的值(用于多值参数)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`getQueryParams` 函数用于从 URL 获取所有指定查询参数的值(用于多值参数)。

```ts
import { getQueryParams } from '@movk/core'

getQueryParams('https://example.com?tags=a&tags=b&tags=c', 'tags')
// ['a', 'b', 'c']

getQueryParams('https://example.com?name=John', 'name')
// ['John']

getQueryParams('https://example.com', 'name')
// []
```

## API

### `getQueryParams(url, key)`{lang="ts-type"}

从 URL 获取所有指定查询参数的值。

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
  ::field{name="返回值" type="string[]"}
  参数值数组。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
