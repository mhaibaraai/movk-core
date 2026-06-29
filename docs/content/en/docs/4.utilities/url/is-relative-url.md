---
title: isRelativeUrl
description: Check whether a URL is a relative path rather than an absolute or protocol-relative URL, useful before joining it to a base.
seo:
  title: isRelativeUrl
  description: Check whether a URL is a relative path rather than an absolute or protocol-relative URL, useful before joining it to a base.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`isRelativeUrl` checks whether a URL is a relative path.

```ts
import { isRelativeUrl } from '@movk/core'

isRelativeUrl('/path/to/page') // true
isRelativeUrl('./page') // true
isRelativeUrl('../page') // true
isRelativeUrl('https://example.com') // false
```

## API

### `isRelativeUrl(url)`{lang="ts-type"}

Check whether a URL is a relative path.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL to check.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="boolean"}
  Whether the URL is a relative path.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
