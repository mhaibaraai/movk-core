---
title: safeEncodeURIComponent
description: 编码 URL 组件(安全版本)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`safeEncodeURIComponent` 函数用于编码 URL 组件(安全版本)。

```ts
import { safeEncodeURIComponent } from '@movk/core'

safeEncodeURIComponent('中文') // '%E4%B8%AD%E6%96%87'
safeEncodeURIComponent('hello world') // 'hello%20world'
```

## API

### `safeEncodeURIComponent(str)`{lang="ts-type"}

编码 URL 组件(安全版本)。

### 参数

::field-group
  ::field{name="str" type="string" required}
  要编码的字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  编码后的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
