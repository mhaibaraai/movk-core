---
title: forEach
description: 遍历树中的每一个节点，并执行 `visitor` 函数。`visitor` 函数可以返回 `false` 来提前终止整个遍历。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/traverse.ts
---

## 用法

`forEach` 方法以深度优先的顺序遍历树中的每一个节点，并对每个节点执行 `visitor` 函数。

```ts
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

const names: string[] = []
Tree.forEach(tree, ({ node }) => {
  names.push(node.name)
})

// names => ['A', 'B']

// 提前终止
Tree.forEach(tree, ({ node }) => {
  if (node.name === 'A') {
    return false // 停止遍历
  }
})
```

## API

`forEach<T extends TreeNode>(tree: T[], visitor: (context: VisitorContext<T>) => void | false, config?: TreeConfig): void`{lang="ts-type"}

### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::

  :::field{name="predicate" type="(context: VisitorContext<T>) => boolean" required}
  一个谓词函数，对树中的每个节点调用。如果函数返回 `true`，该节点及其所有父节点将被保留在结果中。
  该函数接收一个包含以下属性的 `context` 对象：
  :::collapsible
    ::field-group
      ::field{name="node" type="T"}
      当前正在处理的节点。
      ::

      ::field{name="depth" type="number"}
      节点的深度（根节点为 0）。
      ::

      ::field{name="path" type="T[]"}
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

## Changelog

:commit-changelog{prefix="transformers/tree" name="traverse"}
