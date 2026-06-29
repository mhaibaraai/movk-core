---
title: getDomain
description: Extract the hostname from a URL string, returning the domain portion so you can compare, filter, or display the origin of a link.
seo:
  title: getDomain
  description: Extract the hostname from a URL string, returning the domain portion so you can compare, filter, or display the origin of a link.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`getDomain` extracts the hostname portion from a URL.

```ts
import { getDomain } from '@movk/core'

getDomain('https://sub.example.com/path') // 'sub.example.com'
getDomain('https://example.com:8080') // 'example.com'
```

## API

### `getDomain(url)`{lang="ts-type"}

Extract the domain from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The domain name, or an empty string if parsing fails.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
