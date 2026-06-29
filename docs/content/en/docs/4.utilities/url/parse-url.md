---
title: parseUrl
description: Parse a URL string into a structured object of protocol, host, pathname, query, and hash, returning null when the input is invalid.
seo:
  title: parseUrl
  description: Parse a URL string into a structured object of protocol, host, pathname, query, and hash, returning null when the input is invalid.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`parseUrl` parses a URL string into a structured object.

```ts
import { parseUrl } from '@movk/core'

parseUrl('https://example.com:8080/path?query=1#hash')
// {
//   href: 'https://example.com:8080/path?query=1#hash',
//   protocol: 'https:',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path',
//   search: '?query=1',
//   hash: '#hash',
//   auth: '',
//   origin: 'https://example.com:8080'
// }

parseUrl('/path', 'https://example.com')
// parse a relative URL against a base
```

## API

### `parseUrl(url, base?)`{lang="ts-type"}

Parse a URL string into a structured object.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string to parse.
  ::

  ::field{name="base" type="string"}
  An optional base URL used to resolve relative paths.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="ParsedUrl | null"}
  The parsed URL object, or `null` if parsing fails.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
