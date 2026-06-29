---
title: insertAfter
description: Insert a new node immediately after a target node in a tree by id, returning whether the insertion succeeded.
seo:
  title: insertAfter
  description: Insert a new node immediately after a target node in a tree by id, returning whether the insertion succeeded.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/mutate.ts
---

## Usage

The `insertAfter` method inserts a new node immediately after the target node (found by `id`). This method **mutates** the tree array in place.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A' }, { id: 2, name: 'C' }]
const newNode = { id: 3, name: 'B' }

Tree.insertAfter(tree, newNode, 1)

/*
tree will be:
[{ id: 1, name: 'A' }, { id: 3, name: 'B' }, { id: 2, name: 'C' }]
*/
```

## API

`insertAfter<T extends TreeNode>(tree: T[], node: T, targetId: number | string, config?: TreeConfig): boolean`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  ::field{name="node" type="T" required}
  The new node to insert.
  ::

  ::field{name="targetId" type="number | string" required}
  The ID of the target node. The new node will be inserted after this node.
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
  Returns `true` if the target was found and the new node was successfully inserted, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="mutate"}
