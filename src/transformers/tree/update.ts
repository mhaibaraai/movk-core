import type { TreeConfigInput, TreeNode, TreeTransformer } from './types'
import { parseTreeConfig } from './helpers'

/**
 * 按 id 不可变地更新树中的节点
 *
 * 定位 `node[config.id] === targetId` 的节点，以 `updater` 返回的新节点替换之，
 * 仅重建从根到目标的路径，未触及的分支保持原引用；未命中时原样返回同一棵树。
 *
 * @category Tree
 * @param tree 树形结构数组
 * @param targetId 目标节点的 ID
 * @param updater 节点更新函数，接收对象参数 {node, depth, path, index}，返回替换后的节点
 * @param config 树形配置选项
 * @returns 更新后的新树；未命中时返回原树
 * @example
 * ```ts
 * const tree = [{ id: '1', children: [{ id: '2', name: '旧' }] }]
 * const next = updateNode(tree, '2', ({ node }) => ({ ...node, name: '新' }))
 * // tree 不变，next[0].children[0].name === '新'
 * ```
 */
export function updateNode<T = any>(
  tree: TreeNode<T>[],
  targetId: string,
  updater: TreeTransformer<T, T>,
  config: TreeConfigInput = {},
): TreeNode<T>[] {
  const { id: idKey, children: childrenKey } = parseTreeConfig(config)

  const traverse = (
    node: TreeNode<T>,
    depth: number,
    path: readonly TreeNode<T>[],
    index: number,
  ): { node: TreeNode<T>, changed: boolean } => {
    if (node[idKey] === targetId) {
      return { node: updater({ node, depth, path, index }) as TreeNode<T>, changed: true }
    }

    const children = node[childrenKey]
    if (children && children.length > 0) {
      const newPath = [...path, node]
      let changed = false
      const newChildren = children.map((child: TreeNode<T>, childIndex: number) => {
        const result = traverse(child, depth + 1, newPath, childIndex)
        if (result.changed)
          changed = true
        return result.node
      })
      if (changed)
        return { node: { ...node, [childrenKey]: newChildren }, changed: true }
    }

    return { node, changed: false }
  }

  let changed = false
  const result = tree.map((node, index) => {
    const traversed = traverse(node, 0, [node], index)
    if (traversed.changed)
      changed = true
    return traversed.node
  })

  return changed ? result : tree
}
