---
title: getStats
description: 获取关于树的统计信息，如总节点数、叶子节点数、深度等。
---

## `getStats`

`getStats` 方法遍历整个树，并返回一个包含其统计信息的对象。

### 用法

```ts
import { Tree } from '@movk/core'

const tree = [
  { id: 1, children: [
    { id: 2 },
    { id: 3, children: [{ id: 4 }] }
  ]}
]

const stats = Tree.getStats(tree)

/*
stats 将会是:
{
  total: 4,     // 总节点数
  leafCount: 2, // 叶子节点数
  maxDepth: 2,  // 最大深度
  minDepth: 1   // 最小深度（叶子节点中）
}
*/
```

### API

`getStats<T extends TreeNode>(tree: T[], config?: TreeConfig): { total: number; leafCount: number; maxDepth: number; minDepth: number }`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
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
  ::field{name="object"}
  返回一个包含 `total`, `leafCount`, `maxDepth`, `minDepth` 属性的统计对象。
  ::
::
