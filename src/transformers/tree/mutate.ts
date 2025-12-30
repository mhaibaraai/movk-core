import type { TreeConfigInput, TreeNode } from './types'
import { parseTreeConfig } from './helpers'

/**
 * 在指定节点前插入新节点
 *
 * @category Tree
 * @param tree 树形结构数组
 * @param targetId 目标节点的ID
 * @param newNode 要插入的新节点数据
 * @param config 树形配置选项
 * @returns 是否成功插入
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     name: '节点1',
 *     children: [
 *       { id: '2', name: '节点2', children: [] }
 *     ]
 *   }
 * ]
 *
 * const success = insertBefore(tree, '2', { id: '1.5', name: '新节点' })
 * console.log(success) // true
 * ```
 */
export function insertBefore<T = any>(
  tree: TreeNode<T>[],
  targetId: string,
  newNode: T,
  config: TreeConfigInput = {},
): boolean {
  const { id: idKey, children: childrenKey } = parseTreeConfig(config)

  const { [childrenKey]: _, ...nodeData } = newNode as any
  const newTreeNode = { ...nodeData, [childrenKey]: [] } as TreeNode<T>

  const traverse = (nodes: TreeNode<T>[], parentPath: readonly TreeNode<T>[]): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (!node)
        continue

      if (node[idKey] === targetId) {
        nodes.splice(i, 0, newTreeNode)
        return true
      }

      const children = node[childrenKey]
      if (children && children.length > 0) {
        const newPath = [...parentPath, node] as const
        if (traverse(children as TreeNode<T>[], newPath)) {
          return true
        }
      }
    }
    return false
  }

  return traverse(tree, [])
}

/**
 * 在指定节点后插入新节点
 *
 * @category Tree
 * @param tree 树形结构数组
 * @param targetId 目标节点的ID
 * @param newNode 要插入的新节点数据
 * @param config 树形配置选项
 * @returns 是否成功插入
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     name: '节点1',
 *     children: [
 *       { id: '2', name: '节点2', children: [] }
 *     ]
 *   }
 * ]
 *
 * const success = insertAfter(tree, '2', { id: '3', name: '新节点' })
 * console.log(success) // true
 * ```
 */
export function insertAfter<T = any>(
  tree: TreeNode<T>[],
  targetId: string,
  newNode: T,
  config: TreeConfigInput = {},
): boolean {
  const { id: idKey, children: childrenKey } = parseTreeConfig(config)

  const { [childrenKey]: _, ...nodeData } = newNode as any
  const newTreeNode = { ...nodeData, [childrenKey]: [] } as TreeNode<T>

  const traverse = (nodes: TreeNode<T>[], parentPath: readonly TreeNode<T>[]): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (!node)
        continue

      if (node[idKey] === targetId) {
        nodes.splice(i + 1, 0, newTreeNode)
        return true
      }

      const children = node[childrenKey]
      if (children && children.length > 0) {
        const newPath = [...parentPath, node] as const
        if (traverse(children as TreeNode<T>[], newPath)) {
          return true
        }
      }
    }
    return false
  }

  return traverse(tree, [])
}

/**
 * 从树中删除指定节点
 *
 * @category Tree
 * @param tree 树形结构数组
 * @param targetId 要删除的节点ID
 * @param config 树形配置选项
 * @returns 被删除的节点，未找到时返回undefined
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     name: '根节点',
 *     children: [
 *       { id: '2', name: '子节点', children: [] }
 *     ]
 *   }
 * ]
 *
 * const removed = remove(tree, '2')
 * console.log(removed?.name) // '子节点'
 * ```
 */
export function remove<T = any>(
  tree: TreeNode<T>[],
  targetId: string,
  config: TreeConfigInput = {},
): TreeNode<T> | undefined {
  const { id: idKey, children: childrenKey } = parseTreeConfig(config)

  const traverse = (nodes: TreeNode<T>[]): TreeNode<T> | undefined => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (!node)
        continue

      if (node[idKey] === targetId) {
        return nodes.splice(i, 1)[0]
      }

      const children = node[childrenKey]
      if (children && children.length > 0) {
        const result = traverse(children as TreeNode<T>[])
        if (result)
          return result
      }
    }
    return undefined
  }

  return traverse(tree)
}
