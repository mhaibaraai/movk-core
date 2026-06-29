---
title: startCase
description: Convert a string to Start Case, capitalizing each word and separating them with spaces, ideal for readable titles and headings.
seo:
  title: startCase
  description: Convert a string to Start Case, capitalizing each word and separating them with spaces, ideal for readable titles and headings.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/startCase.ts
---

## Usage

Converts a string to Start Case format (each word capitalized, separated by spaces).

```ts
import { startCase } from '@movk/core'

startCase('firstName') // => 'First Name'
startCase('first_name') // => 'First Name'
startCase('first-name') // => 'First Name'
startCase('XMLHttpRequest') // => 'XML Http Request'
```

## API

`startCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in Start Case format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
