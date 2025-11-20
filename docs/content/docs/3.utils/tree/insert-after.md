---
title: insertAfter
description: 在目标节点之后插入一个新节点。 (此方法会**原地修改**传入的树数组)
---

## `insertAfter`

`insertAfter` 方法在目标节点（通过 `id` 查找）之后插入一个新节点。此方法会 **原地修改** 传入的树数组。

### 用法

```ts
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A' }, { id: 2, name: 'C' }]
const newNode = { id: 3, name: 'B' }

Tree.insertAfter(tree, newNode, 1)

/*
tree 将会是:
[{ id: 1, name: 'A' }, { id: 3, name: 'B' }, { id: 2, name: 'C' }]
*/
```

### API

`insertAfter<T extends TreeNode>(tree: T[], node: T, targetId: number | string, config?: TreeConfig): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::
  ::field{name="node" type="T" required}
  需要插入的新节点。
  ::
  ::field{name="targetId" type="number | string" required}
  目标节点的 ID。新节点将插入到该节点之后。
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
  ::field{name="boolean"}
  如果成功找到目标并插入新节点，则返回 `true`，否则返回 `false`。
  ::
::
