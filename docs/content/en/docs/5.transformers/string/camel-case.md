---
title: camelCase
description: Convert a string to camelCase, lowercasing the first word and capitalizing the rest, with no separators between joined words.
seo:
  title: camelCase
  description: Convert a string to camelCase, lowercasing the first word and capitalizing the rest, with no separators between joined words.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/camelCase.ts
---

## Usage

Converts a string to camelCase format (first word lowercased, subsequent words capitalized).

```ts
import { camelCase } from '@movk/core'

camelCase('First Name') // => 'firstName'
camelCase('first_name') // => 'firstName'
camelCase('first-name') // => 'firstName'
camelCase('XMLHttpRequest') // => 'xmlHttpRequest'
```

## API

`camelCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in camelCase format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
