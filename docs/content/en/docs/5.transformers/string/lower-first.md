---
title: lowerFirst
description: Lowercase only the first character of a string while preserving the rest, a small helper for identifier and label formatting.
seo:
  title: lowerFirst
  description: Lowercase only the first character of a string while preserving the rest, a small helper for identifier and label formatting.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/lowerFirst.ts
---

## Usage

Lowercases only the first letter of a string, leaving the rest unchanged.

```ts
import { lowerFirst } from '@movk/core'

lowerFirst('Foo Bar') // => 'foo Bar'
lowerFirst('FOO BAR') // => 'fOO BAR'
```

## API

`lowerFirst(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string with the first letter lowercased.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
