---
title: safeDecodeURIComponent
description: 解码 URL 组件(安全版本,失败返回原字符串)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`safeDecodeURIComponent` 函数用于解码 URL 组件(安全版本,失败返回原字符串)。

```ts
import { safeDecodeURIComponent } from '@movk/core'

safeDecodeURIComponent('%E4%B8%AD%E6%96%87') // '中文'
safeDecodeURIComponent('hello%20world') // 'hello world'
safeDecodeURIComponent('%invalid%') // '%invalid%'
```

## API

### `safeDecodeURIComponent(str)`{lang="ts-type"}

解码 URL 组件(安全版本)。

### 参数

::field-group
  ::field{name="str" type="string" required}
  要解码的字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  解码后的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
