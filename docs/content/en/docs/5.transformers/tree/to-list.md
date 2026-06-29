---
title: toList
description: Flatten a tree back into a flat array using the configured fields, the inverse of fromList for persistence and serialization.
seo:
  title: toList
  description: Flatten a tree back into a flat array using the configured fields, the inverse of fromList for persistence and serialization.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/convert.ts
---

## Usage

The `toList` method converts a nested tree structure back into a flat array. It is the inverse operation of `fromList`.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [
  {
    id: 1,
    pid: 0,
    name: 'root',
    children: [
      { id: 2, pid: 1, name: 'child 1' },
      { id: 3, pid: 1, name: 'child 2' }
    ]
  }
]

const list = Tree.toList(tree)
/*
list will be:
[
  { id: 1, pid: 0, name: 'root' },
  { id: 2, pid: 1, name: 'child 1' },
  { id: 3, pid: 1, name: 'child 2' }
]
*/
```

## API

`toList<T extends TreeNode>(tree: T[], config?: TreeConfig): T[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The nested tree array of nodes.
  ::

  :::field{name="config" type="TreeConfig"}
  Configuration object for customizing the `id`, `pid`, `children` key names in the tree structure.
  :::collapsible
    ::field-group
      ::field{name="id" type="string"}
      Optional. The key name for the node's unique identifier. Defaults to "id".
      ::

      ::field{name="pid" type="string"}
      Optional. The key name for the node's parent identifier. Defaults to "pid".
      ::

      ::field{name="children" type="string"}
      Optional. The key name for the children array. Defaults to "children".
      ::
    ::
  :::
  :::
::

### Returns

::field-group
  ::field{name="T[]"}
  Returns a flat array of nodes.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="convert"}
