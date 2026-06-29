---
title: updateNode
description: Immutably update a tree node by id, rebuilding only the path from root to target while keeping untouched branches by reference.
seo:
  title: updateNode
  description: Immutably update a tree node by id, rebuilding only the path from root to target while keeping untouched branches by reference.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/update.ts
navigation.badge: v1.3.1
---

## Usage

`updateNode` locates the node where `node[config.id] === targetId`, replaces it with the new node returned by `updater`. It only rebuilds the path from the root to the target node; untouched branches retain their original references. If the target is not found, the original tree is returned unchanged.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: '1', children: [{ id: '2', name: 'old' }] }]

const next = Tree.updateNode(tree, '2', ({ node }) => ({ ...node, name: 'new' }))

// tree remains unchanged
// next[0].children[0].name === 'new'
// next[0].children[0] is a new reference; untouched sibling branches retain their original references
```

## API

`updateNode<T>(tree: TreeNode<T>[], targetId: string, updater: TreeTransformer<T, T>, config?: TreeConfig): TreeNode<T>[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="TreeNode<T>[]" required}
  The source tree array.
  ::

  ::field{name="targetId" type="string" required}
  The ID of the target node, matched against the key specified by `config.id`.
  ::

  :::field{name="updater" type="TreeTransformer<T, T>" required}
  A node update function called on the matched node. Returns the replacement node.
  The function receives a `context` object with the following properties:
  :::collapsible
    ::field-group
      ::field{name="node" type="TreeNode<T>"}
      The matched node currently being processed.
      ::

      ::field{name="depth" type="number"}
      The depth of the node (root node is 0).
      ::

      ::field{name="path" type="TreeNode<T>[]"}
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
  ::field{name="TreeNode<T>[]"}
  The updated new tree array; returns the original tree if no match is found.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="update"}
