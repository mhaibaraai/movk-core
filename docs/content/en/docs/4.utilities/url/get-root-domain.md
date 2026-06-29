---
title: getRootDomain
description: Extract the root domain from a URL, correctly handling compound top-level domains so subdomains collapse to their registrable base.
seo:
  title: getRootDomain
  description: Extract the root domain from a URL, correctly handling compound top-level domains so subdomains collapse to their registrable base.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`getRootDomain` extracts the root domain (top-level domain + second-level domain) from a URL.

```ts
import { getRootDomain } from '@movk/core'

getRootDomain('https://sub.example.com') // 'example.com'
getRootDomain('https://a.b.example.co.uk') // 'example.co.uk'
```

## API

### `getRootDomain(url)`{lang="ts-type"}

Get the root domain (TLD + second-level domain) from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The root domain, or an empty string if parsing fails.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
