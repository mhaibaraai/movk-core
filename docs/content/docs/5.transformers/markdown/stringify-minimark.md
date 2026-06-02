---
title: stringifyMinimark
description: 将 Minimark-like AST 子集序列化为 Markdown，不支持的标签回退为 HTML
seo:
  title: stringifyMinimark
  description: Serialize a Minimark-like AST into Markdown, supporting headings, lists, tables, and inline marks, and falling back to HTML for unsupported tags.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/markdown/stringifyMinimark.ts
---

## 用法

`stringifyMinimark` 函数将 Minimark-like AST 子集序列化为 Markdown。支持的节点输出 Markdown，不支持的标签回退为 HTML。该函数不是 `minimark.stringify()` 的字节级等价替代。

```ts
import { stringifyMinimark } from '@movk/core'

stringifyMinimark({
  value: [
    ['h1', {}, 'Title'],
    ['p', {}, 'Hello ', ['strong', {}, 'world']],
  ],
})
// => "# Title\n\nHello **world**\n"
```

### 列表与表格

```ts
stringifyMinimark({
  value: [
    ['ul', {}, ['li', {}, 'first'], ['li', {}, 'second']],
  ],
})
// => "- first\n- second\n"
```

### HTML 回退

```ts
stringifyMinimark({
  value: [
    ['div', { class: 'note' }, ['p', {}, 'content']],
  ],
})
// => 不支持的 div 标签回退为 HTML 输出
```

## API

### `stringifyMinimark(body)`{lang="ts-type"}

将 Minimark-like 文档主体序列化为 Markdown。

### 参数

::field-group
  ::field{name="body" type="MinimarkDocument" required}
  要序列化的 Minimark-like 文档主体。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  带 HTML fallback 的 Markdown 字符串，以单个换行结尾。
  ::
::

### MinimarkNode

::field-group
  ::field{name="MinimarkNode" type="string | [tag, attributes, ...children]"}
  Minimark-like AST 节点。字符串节点表示文本内容，元组节点使用 `[tag, attributes, ...children]` 结构表示元素。
  ::
::

### MinimarkDocument

::field-group
  ::field{name="value" type="MinimarkNode[]"}
  文档主体的根节点列表。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/markdown"}
