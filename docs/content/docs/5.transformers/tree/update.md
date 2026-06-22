---
title: updateNode
description: 按 id 不可变地更新树中的节点，仅重建从根到目标的路径。
seo:
  title: updateNode
  description: Immutably update a tree node by id, rebuilding only the path from root to target while keeping untouched branches by reference.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/update.ts
---

## 用法

`updateNode` 定位 `node[config.id] === targetId` 的节点，以 `updater` 返回的新节点替换之。它仅重建从根到目标的路径，未触及的分支保持原引用；未命中时原样返回同一棵树。

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: '1', children: [{ id: '2', name: '旧' }] }]

const next = Tree.updateNode(tree, '2', ({ node }) => ({ ...node, name: '新' }))

// tree 保持不变
// next[0].children[0].name === '新'
// next[0].children[0] 是新引用，未命中的兄弟分支保持原引用
```

## API

`updateNode<T>(tree: TreeNode<T>[], targetId: string, updater: TreeTransformer<T, T>, config?: TreeConfig): TreeNode<T>[]`{lang="ts-type"}

### 参数

::field-group
  ::field{name="tree" type="TreeNode<T>[]" required}
  源树形结构数组。
  ::

  ::field{name="targetId" type="string" required}
  目标节点的 ID，与 `config.id` 指定的键名进行匹配。
  ::

  :::field{name="updater" type="TreeTransformer<T, T>" required}
  节点更新函数，对命中的节点调用，返回替换后的节点。
  该函数接收一个包含以下属性的 `context` 对象：
  :::collapsible
    ::field-group
      ::field{name="node" type="TreeNode<T>"}
      当前命中的节点。
      ::

      ::field{name="depth" type="number"}
      节点的深度（根节点为 0）。
      ::

      ::field{name="path" type="TreeNode<T>[]"}
      从根节点到当前节点的路径数组（包含当前节点）。
      ::

      ::field{name="index" type="number"}
      当前节点在其同级节点中的索引。
      ::
    ::
  :::
  :::

  :::field{name="config" type="TreeConfig"}
  用于自定义树形结构中 `id`, `pid`, `children` 键名的配置对象。
  :::collapsible
    ::field-group
      ::field{name="id" type="string"}
      可选。指定节点唯一标识符的键名。默认为 "id"。
      ::

      ::field{name="pid" type="string"}
      可选。指定节点父级标识符的键名。默认为 "pid"。
      ::

      ::field{name="children" type="string"}
      可选。指定子节点数组的键名。默认为 "children"。
      ::
    ::
  :::
  :::
::

### 返回值

::field-group
  ::field{name="TreeNode<T>[]"}
  更新后的新树形结构数组；未命中时返回原树。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="update"}
