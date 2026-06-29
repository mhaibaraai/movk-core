---
title: upperFirst
description: Uppercase only the first character of a string while preserving the rest, a small helper for sentence and label formatting.
seo:
  title: upperFirst
  description: Uppercase only the first character of a string while preserving the rest, a small helper for sentence and label formatting.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/upperFirst.ts
---

## Usage

Uppercases only the first letter of a string, leaving the rest unchanged.

```ts
import { upperFirst } from '@movk/core'

upperFirst('foo bar') // => 'Foo bar'
upperFirst('FOO BAR') // => 'FOO BAR'
```

## API

`upperFirst(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string with the first letter uppercased.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
