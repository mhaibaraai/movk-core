---
title: isAbsoluteUrl
description: Check whether a URL is absolute, including protocol-relative URLs, so you can decide when to resolve it against a base location.
seo:
  title: isAbsoluteUrl
  description: Check whether a URL is absolute, including protocol-relative URLs, so you can decide when to resolve it against a base location.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`isAbsoluteUrl` checks whether a URL is an absolute path.

```ts
import { isAbsoluteUrl } from '@movk/core'

isAbsoluteUrl('https://example.com') // true
isAbsoluteUrl('/path/to/page') // false
isAbsoluteUrl('//example.com/path') // true (protocol-relative)
```

## API

### `isAbsoluteUrl(url)`{lang="ts-type"}

Check whether a URL is an absolute path.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL to check.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="boolean"}
  Whether the URL is absolute.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
