---
title: remove
description: Remove a node from a tree by id and return the removed node, detaching its subtree from the parent in a single call.
seo:
  title: remove
  description: Remove a node from a tree by id and return the removed node, detaching its subtree from the parent in a single call.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/mutate.ts
---

## Usage

The `remove` method removes a node and all its descendants from the tree by node `id`. This method **mutates** the tree array in place.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

Tree.remove(tree, 2)

/*
tree will be:
[{ id: 1, name: 'A', children: [] }]
*/
```

## API

`remove<T extends TreeNode>(tree: T[], id: number | string, config?: TreeConfig): boolean`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  ::field{name="id" type="number | string" required}
  The ID of the node to remove.
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
  ::field{name="boolean"}
  Returns `true` if the node was found and removed, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="mutate"}
