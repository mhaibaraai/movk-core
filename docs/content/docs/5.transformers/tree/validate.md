---
title: validate
description: 验证树的结构是否有效，检查重复 ID 和循环引用。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/validate.ts
---

## 用法

`validate` 方法用于验证树的结构是否有效。它主要检查两个问题：
1.  是否存在重复的节点 `id`。
2.  是否存在循环引用（即一个节点是其自身的祖先）。

```ts
import { Tree } from '@movk/core'

// 有效的树
const validTree = [{ id: 1, children: [{ id: 2 }] }]
Tree.validate(validTree) // 不会抛出错误

// 无效的树 (重复ID)
const invalidTree1 = [{ id: 1 }, { id: 1 }]
try {
  Tree.validate(invalidTree1)
}
catch (e) {
  console.error(e.message) // "Duplicate ID found: 1"
}

// 无效的树 (循环引用)
const node1 = { id: 1 }
const node2 = { id: 2, children: [node1] }
node1.children = [node2]
const invalidTree2 = [node1]
try {
  Tree.validate(invalidTree2)
}
catch (e) {
  console.error(e.message) // "Circular reference detected in node ID: 2"
}
```

## API

`validate<T extends TreeNode>(tree: T[], config?: TreeConfig): void`{lang="ts-type"}

### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::

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

如果树结构无效，此方法会抛出一个 `Error`。

## Changelog

:commit-changelog{prefix="transformers/tree" name="validate"}
