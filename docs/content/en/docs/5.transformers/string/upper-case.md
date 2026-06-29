---
title: upperCase
description: Convert a string to UPPERCASE words separated by single spaces, splitting camelCase, snake_case, and kebab-case input first.
seo:
  title: upperCase
  description: Convert a string to UPPERCASE words separated by single spaces, splitting camelCase, snake_case, and kebab-case input first.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/upperCase.ts
---

## Usage

Converts a string to uppercase format with words separated by spaces.

```ts
import { upperCase } from '@movk/core'

upperCase('firstName') // => 'FIRST NAME'
upperCase('first_name') // => 'FIRST NAME'
upperCase('first-name') // => 'FIRST NAME'
upperCase('XMLHttpRequest') // => 'XML HTTP REQUEST'
```

## API

`upperCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in uppercase format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
