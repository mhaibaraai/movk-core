---
title: stringifyMinimark
description: Serialize a Minimark-like AST into Markdown, supporting headings, lists, tables, and inline marks, and falling back to HTML for unsupported tags.
seo:
  title: stringifyMinimark
  description: Serialize a Minimark-like AST into Markdown, supporting headings, lists, tables, and inline marks, and falling back to HTML for unsupported tags.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/markdown/stringifyMinimark.ts
---

## Usage

`stringifyMinimark` serializes a Minimark-like AST subset into Markdown. Supported nodes are output as Markdown; unsupported tags fall back to HTML. This function is not a byte-level equivalent replacement for `minimark.stringify()`.

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

### Lists and Tables

```ts
stringifyMinimark({
  value: [
    ['ul', {}, ['li', {}, 'first'], ['li', {}, 'second']],
  ],
})
// => "- first\n- second\n"
```

### HTML Fallback

```ts
stringifyMinimark({
  value: [
    ['div', { class: 'note' }, ['p', {}, 'content']],
  ],
})
// => unsupported div tag falls back to HTML output
```

## API

### `stringifyMinimark(body)`{lang="ts-type"}

Serializes a Minimark-like document body into Markdown.

### Parameters

::field-group
  ::field{name="body" type="MinimarkDocument" required}
  The Minimark-like document body to serialize.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  A Markdown string with HTML fallback, ending with a single newline.
  ::
::

### MinimarkNode

::field-group
  ::field{name="MinimarkNode" type="string | [tag, attributes, ...children]"}
  A Minimark-like AST node. String nodes represent text content; tuple nodes use the `[tag, attributes, ...children]` structure to represent elements.
  ::
::

### MinimarkDocument

::field-group
  ::field{name="value" type="MinimarkNode[]"}
  The root node list of the document body.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/markdown"}
