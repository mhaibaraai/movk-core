---
title: fromList
description: Convert a flat array into a nested tree using configurable id, parent id, and children fields, the core of tree-structured data.
seo:
  title: fromList
  description: Convert a flat array into a nested tree using configurable id, parent id, and children fields, the core of tree-structured data.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/convert.ts
---

## Usage

The `fromList` method converts a flat array with parent-child relationships (via `pid`) into a nested tree structure.

```ts [example.ts]
import { Tree } from '@movk/core'

const list = [
  { id: 1, pid: 0, name: 'root' },
  { id: 2, pid: 1, name: 'child 1' },
  { id: 3, pid: 1, name: 'child 2' },
  { id: 4, pid: 2, name: 'grandchild' }
]

const tree = Tree.fromList(list)

/*
tree will be:
[
  {
    id: 1,
    pid: 0,
    name: 'root',
    children: [
      {
        id: 2,
        pid: 1,
        name: 'child 1',
        children: [
          { id: 4, pid: 2, name: 'grandchild', children: [] }
        ]
      },
      { id: 3, pid: 1, name: 'child 2', children: [] }
    ]
  }
]
*/
```

## API

`fromList<T extends TreeNode>(list: T[], config?: TreeConfig): T[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="list" type="T[]" required}
  A flat array containing parent-child relationships.
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
  Returns a nested tree array.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="convert"}
