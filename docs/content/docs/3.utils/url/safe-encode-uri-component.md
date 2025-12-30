---
title: safeEncodeURIComponent
description: 安全编码 URL 组件。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `safeEncodeURIComponent`

安全版本的 `encodeURIComponent`。

### 用法

```ts
import { safeEncodeURIComponent } from '@movk/core'

safeEncodeURIComponent('中文') // => '%E4%B8%AD%E6%96%87'
safeEncodeURIComponent('hello world') // => 'hello%20world'
safeEncodeURIComponent('') // => ''
```

### API

`safeEncodeURIComponent(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要编码的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  编码后的字符串。
  ::
::

## 相关

- [safeDecodeURIComponent](/docs/utils/url/safe-decode-uri-component) - 安全解码

## Changelog

:commit-changelog{prefix="utils/url"}
