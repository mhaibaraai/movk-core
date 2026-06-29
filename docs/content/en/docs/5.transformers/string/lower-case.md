---
title: lowerCase
description: Convert a string to lowercase words separated by single spaces, splitting camelCase, snake_case, and kebab-case input first.
seo:
  title: lowerCase
  description: Convert a string to lowercase words separated by single spaces, splitting camelCase, snake_case, and kebab-case input first.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/lowerCase.ts
---

## Usage

Converts a string to lowercase format with words separated by spaces.

```ts
import { lowerCase } from '@movk/core'

lowerCase('firstName') // => 'first name'
lowerCase('First_Name') // => 'first name'
lowerCase('FIRST-NAME') // => 'first name'
lowerCase('XMLHttpRequest') // => 'xml http request'
```

## API

`lowerCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in lowercase format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
