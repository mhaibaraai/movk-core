---
title: transform
description: 遍历树并根据 `transformer` 函数返回一个具有新结构的新树。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/tree.ts
---

## `transform`

`transform` 方法遍历树的每个节点，并使用 `transformer` 函数将其转换为新的形态，从而构建一棵具有新结构的树。

### 用法

```ts
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'Admin', children: [{ id: 2, name: 'Guest' }] }]

const transformedTree = Tree.transform(tree, ({ node }) => ({
  key: node.id,
  title: node.name,
  children: [] // 转换器需要处理子节点
}))

/*
transformedTree 将会是:
[
  {
    key: 1,
    title: 'Admin',
    children: [
      { key: 2, title: 'Guest', children: [] }
    ]
  }
]
*/
```

### API

`transform<T extends TreeNode, R extends TreeNode>(tree: T[], transformer: (context: VisitorContext<T>) => R, config?: TreeConfig): R[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::
  ::field{name="transformer" type="(context: VisitorContext<T>) => R" required}
      一个转换函数，对树中的每个节点调用，并返回一个新节点，用于构建新的树结构。
      该函数接收一个包含以下属性的 `context` 对象：

      ::collapsible
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
      ::
      ::
  ::field{name="config" type="TreeConfig"}
  用于自定义树形结构中 `id`, `pid`, `children` 键名的配置对象。

  ::collapsible
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
  ::
  ::
::

#### 返回值

::field-group
  ::field{name="R[]"}
  返回转换后的新树形结构数组。
  ::
::
