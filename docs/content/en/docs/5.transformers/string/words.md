---
title: words
description: Split a string into an array of words, recognizing camelCase, snake_case, and kebab-case boundaries for reliable tokenization.
seo:
  title: words
  description: Split a string into an array of words, recognizing camelCase, snake_case, and kebab-case boundaries for reliable tokenization.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/words.ts
---

## Usage

`words` is the foundation for all case-conversion functions. It accepts a string and splits it into an array of words. It handles camelCase, snake_case, kebab-case, and abbreviations.

```ts
import { words } from '@movk/core'

words('helloWorld') // => ['hello', 'World']
words('hello_world') // => ['hello', 'world']
words('hello-world') // => ['hello', 'world']
words('XMLHttpRequest') // => ['XML', 'Http', 'Request']
```

## API

`words(str: string): string[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to split.
  ::
::

### Returns

::field-group
  ::field{name="string[]"}
  Returns an array of words extracted from the input string.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
