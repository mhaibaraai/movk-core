---
title: getRelativePath
description: Compute the relative path between two URLs, returning a path that navigates from the source location to the target location.
seo:
  title: getRelativePath
  description: Compute the relative path between two URLs, returning a path that navigates from the source location to the target location.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`getRelativePath` computes the relative path between two URLs.

```ts
import { getRelativePath } from '@movk/core'

getRelativePath('https://example.com/a/b', 'https://example.com/a/c')
// '../c'

getRelativePath('https://example.com/a', 'https://example.com/a/b/c')
// 'b/c'
```

## API

### `getRelativePath(from, to)`{lang="ts-type"}

Get the relative path between two URLs.

### Parameters

::field-group
  ::field{name="from" type="string" required}
  The source URL.
  ::

  ::field{name="to" type="string" required}
  The target URL.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The relative path.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
