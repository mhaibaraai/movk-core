---
title: findAll
description: Find every node in a tree that matches a predicate, returning a flat array of matches across all branches and depth levels.
seo:
  title: findAll
  description: Find every node in a tree that matches a predicate, returning a flat array of matches across all branches and depth levels.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/query.ts
---

## Usage

The `findAll` method performs a depth-first search on the tree and returns an array of all nodes that satisfy the `predicate` function.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, type: 'folder', children: [{ id: 2, type: 'file' }, { id: 3, type: 'folder' }] }]

const folders = Tree.findAll(tree, ({ node }) => node.type === 'folder')

// folders => [{ id: 1, type: 'folder', ... }, { id: 3, type: 'folder' }]
```

## API

`findAll<T extends TreeNode>(tree: T[], predicate: (context: VisitorContext<T>) => boolean, config?: TreeConfig): T[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  :::field{name="predicate" type="(context: VisitorContext<T>) => boolean" required}
  A predicate function called for each node in the tree. If the function returns `true`, that node and all its ancestor nodes will be retained in the result.
  The function receives a `context` object with the following properties:
  :::collapsible
    ::field-group
      ::field{name="node" type="T"}
      The node currently being processed.
      ::

      ::field{name="depth" type="number"}
      The depth of the node (root node is 0).
      ::

      ::field{name="path" type="T[]"}
      An array of nodes from the root to the current node (inclusive).
      ::

      ::field{name="index" type="number"}
      The index of the current node among its siblings.
      ::
    ::
  :::
  :::

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
  Returns an array containing all matching nodes.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="query"}
