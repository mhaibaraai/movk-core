---
title: isValidUrl
description: Check whether a string is a parseable URL, returning a boolean so you can validate user input before building links or fetching.
seo:
  title: isValidUrl
  description: Check whether a string is a parseable URL, returning a boolean so you can validate user input before building links or fetching.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`isValidUrl` checks whether a string is a valid URL.

```ts
import { isValidUrl } from '@movk/core'

isValidUrl('https://example.com') // true
isValidUrl('not a url') // false
isValidUrl('ftp://files.example.com') // true
```

## API

### `isValidUrl(url)`{lang="ts-type"}

Check whether a string is a valid URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The string to check.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="boolean"}
  Whether the string is a valid URL.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
