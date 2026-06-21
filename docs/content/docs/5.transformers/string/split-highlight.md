---
title: splitHighlight
description: 按关键字将文本切分为命中/未命中片段，便于渲染高亮。
seo:
  title: splitHighlight
  description: Split text into matched and unmatched segments by a case-insensitive keyword, preserving original casing for rendering search highlights.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/splitHighlight.ts
---

## 用法

`splitHighlight` 按关键字将文本切分为命中（`match: true`）与未命中（`match: false`）的片段，依次拼接即为原文本，便于在 UI 中渲染搜索高亮。

匹配不区分大小写，命中片段保留原始大小写；关键字为空或文本不含关键字时，返回整段未命中。

```ts
import { splitHighlight } from '@movk/core'

splitHighlight('ABC', 'b')
// => [
//   { text: 'A', match: false },
//   { text: 'B', match: true },
//   { text: 'C', match: false }
// ]

splitHighlight('Hello World', '')
// => [{ text: 'Hello World', match: false }]
```

## API

`splitHighlight(text: string, term: string): HighlightSegment[]`{lang="ts-type"}

### 参数

::field-group
  ::field{name="text" type="string" required}
  源文本。
  ::

  ::field{name="term" type="string" required}
  关键字。为空白字符串时返回整段未命中。
  ::
::

### 返回值

::field-group
  :::field{name="HighlightSegment[]"}
  片段数组，依次拼接即为原文本。每个片段包含：
  :::collapsible
    ::field-group
      ::field{name="text" type="string"}
      片段文本，保留原始大小写。
      ::

      ::field{name="match" type="boolean"}
      该片段是否命中关键字。
      ::
    ::
  :::
  :::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
