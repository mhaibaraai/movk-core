---
title: capitalize
description: Capitalize the first character of a string and lowercase the remaining characters, returning a tidy single-word display form.
seo:
  title: capitalize
  description: Capitalize the first character of a string and lowercase the remaining characters, returning a tidy single-word display form.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/capitalize.ts
---

## Usage

Converts the first letter of a string to uppercase and the remaining letters to lowercase.

```ts
import { capitalize } from '@movk/core'

capitalize('foo bar') // => 'Foo bar'
capitalize('FOO BAR') // => 'Foo bar'
```

## API

`capitalize(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string with the first letter capitalized.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
