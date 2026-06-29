---
title: splitHighlight
description: Split text into matched and unmatched segments by a case-insensitive keyword, preserving original casing for rendering search highlights.
seo:
  title: splitHighlight
  description: Split text into matched and unmatched segments by a case-insensitive keyword, preserving original casing for rendering search highlights.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/splitHighlight.ts
navigation.badge: v1.3.1
---

## Usage

`splitHighlight` splits text into matched (`match: true`) and unmatched (`match: false`) segments by a keyword. Concatenating the segments in order reconstructs the original text, making it easy to render search highlights in a UI.

Matching is case-insensitive and matched segments preserve the original casing. When the keyword is empty or the text does not contain the keyword, a single unmatched segment is returned.

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

### Parameters

::field-group
  ::field{name="text" type="string" required}
  The source text.
  ::

  ::field{name="term" type="string" required}
  The keyword. Returns a single unmatched segment when the keyword is an empty string.
  ::
::

### Returns

::field-group
  :::field{name="HighlightSegment[]"}
  An array of segments that reconstruct the original text when concatenated. Each segment contains:

  :::collapsible
    ::field-group
      ::field{name="text" type="string"}
      The segment text, preserving the original casing.
      ::

      ::field{name="match" type="boolean"}
      Whether this segment matches the keyword.
      ::
    ::
  :::
  :::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
