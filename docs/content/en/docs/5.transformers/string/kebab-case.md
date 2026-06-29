---
title: kebabCase
description: Convert a string to kebab-case, lowercasing words and joining them with hyphens, ideal for URLs, file names, and CSS classes.
seo:
  title: kebabCase
  description: Convert a string to kebab-case, lowercasing words and joining them with hyphens, ideal for URLs, file names, and CSS classes.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/kebabCase.ts
---

## Usage

Converts a string to kebab-case format.

```ts
import { kebabCase } from '@movk/core'

kebabCase('firstName') // => 'first-name'
kebabCase('First Name') // => 'first-name'
kebabCase('first_name') // => 'first-name'
kebabCase('XMLHttpRequest') // => 'xml-http-request'
```

## API

`kebabCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in kebab-case format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
