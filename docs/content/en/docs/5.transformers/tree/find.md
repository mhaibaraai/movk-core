---
title: find
description: Find the first tree node that matches a predicate during traversal, returning the node or undefined when nothing matches.
seo:
  title: find
  description: Find the first tree node that matches a predicate during traversal, returning the node or undefined when nothing matches.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/query.ts
---

## Usage

The `find` method performs a depth-first search on the tree and returns the first node that satisfies the `predicate` function.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

const node = Tree.find(tree, ({ node }) => node.name === 'B')

// node => { id: 2, name: 'B' }
```

## API

`find<T extends TreeNode>(tree: T[], predicate: (context: VisitorContext<T>) => boolean, config?: TreeConfig): T | undefined`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  :::field{name="predicate" type="(context: VisitorContext<T>) => boolean" required}
  A predicate function called for each node in the tree. When the function returns `true` for the first node, `find` returns that node and stops traversal.
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
  ::field{name="T | undefined"}
  Returns the first matching node, or `undefined` if no match is found.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="query"}
