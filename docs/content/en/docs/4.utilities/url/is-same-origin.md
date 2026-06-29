---
title: isSameOrigin
description: Check whether two URLs share the same origin (protocol, host, and port), a common guard before trusting cross-document navigation.
seo:
  title: isSameOrigin
  description: Check whether two URLs share the same origin (protocol, host, and port), a common guard before trusting cross-document navigation.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`isSameOrigin` checks whether two URLs share the same origin.

```ts
import { isSameOrigin } from '@movk/core'

isSameOrigin('https://example.com/a', 'https://example.com/b') // true
isSameOrigin('https://example.com', 'https://sub.example.com') // false
isSameOrigin('https://example.com', 'http://example.com') // false
```

## API

### `isSameOrigin(url1, url2)`{lang="ts-type"}

Check whether two URLs share the same origin.

### Parameters

::field-group
  ::field{name="url1" type="string" required}
  The first URL.
  ::

  ::field{name="url2" type="string" required}
  The second URL.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="boolean"}
  Whether the two URLs have the same origin.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
