---
title: safeDecodeURIComponent
description: 安全解码 URL 组件。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `safeDecodeURIComponent`

安全版本的 `decodeURIComponent`，解码失败时返回原字符串而不是抛出异常。

### 用法

```ts
import { safeDecodeURIComponent } from '@movk/core'

safeDecodeURIComponent('%E4%B8%AD%E6%96%87') // => '中文'
safeDecodeURIComponent('hello%20world') // => 'hello world'

// 无效编码返回原字符串
safeDecodeURIComponent('%invalid%') // => '%invalid%'
safeDecodeURIComponent('%') // => '%'
```

### API

`safeDecodeURIComponent(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要解码的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  解码后的字符串，失败返回原字符串。
  ::
::

## 相关

- [safeEncodeURIComponent](/docs/utils/url/safe-encode-uri-component) - 安全编码

## Changelog

:commit-changelog{prefix="utils/url"}
