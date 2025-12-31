import type { TreeConfigInput, TreeNode, TreeStats } from './types'
import { parseTreeConfig } from './helpers'

/**
 * 获取树形结构的统计信息
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param config 树形配置选项
 * @returns 树的统计信息，包含总节点数、叶子节点数、最大深度和分支节点数
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     name: '根节点',
 *     children: [
 *       { id: '2', name: '子节点1', children: [] },
 *       { id: '3', name: '子节点2', children: [
 *         { id: '4', name: '孙节点', children: [] }
 *       ] }
 *     ]
 *   }
 * ]
 *
 * const stats = getStats(tree)
 * console.log(stats) // { total: 4, leaves: 2, depth: 3, branches: 2 }
 * ```
 */
export function getStats<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  config: TreeConfigInput = {},
): TreeStats {
  const { children: childrenKey } = parseTreeConfig(config)

  const nodes = Array.isArray(tree) ? tree : [tree]
  let total = 0
  let leaves = 0
  let maxDepth = 0
  let branches = 0

  const traverse = (node: TreeNode<T>, depth: number) => {
    total++
    maxDepth = Math.max(maxDepth, depth)

    const children = node[childrenKey]
    if (children && children.length > 0) {
      branches++
      children.forEach((child: TreeNode<T>) => traverse(child, depth + 1))
    }
    else {
      leaves++
    }
  }

  nodes.forEach(node => traverse(node, 1))

  return {
    total,
    leaves,
    depth: maxDepth,
    branches,
  }
}

/**
 * 验证树形结构的有效性
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param config 树形配置选项
 * @returns 验证结果，包含是否有效和错误信息数组
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
 * const result = validate(tree)
 * console.log(result.isValid) // true
 * console.log(result.errors) // []
 * ```
 */
export function validate<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  config: TreeConfigInput = {},
): { isValid: boolean, errors: string[] } {
  const { id: idKey, children: childrenKey } = parseTreeConfig(config)

  const nodes = Array.isArray(tree) ? tree : [tree]
  const errors: string[] = []
  const visitedIds = new Set<string>()

  const traverse = (
    node: TreeNode<T>,
    depth: number,
    path: readonly TreeNode<T>[],
  ) => {
    // 检查节点是否有有效的ID
    const nodeId = node[idKey]
    if (!nodeId || typeof nodeId !== 'string') {
      errors.push(`Node at depth ${depth} has invalid or missing ID`)
      return
    }

    // 检查ID是否重复
    if (visitedIds.has(nodeId)) {
      errors.push(`Duplicate ID found: ${nodeId}`)
      return
    }
    visitedIds.add(nodeId)

    // 检查循环引用
    if (path.some(parent => parent[idKey] === nodeId)) {
      errors.push(`Circular reference detected for ID: ${nodeId}`)
      return
    }

    // 检查children属性
    const children = node[childrenKey]
    if (children !== undefined && !Array.isArray(children)) {
      errors.push(`Node ${nodeId} has invalid children property (not an array)`)
      return
    }

    // 递归验证子节点
    if (children && children.length > 0) {
      const newPath = [...path, node]
      children.forEach((child: TreeNode<T>) => {
        traverse(child, depth + 1, newPath)
      })
    }
  }

  nodes.forEach(node => traverse(node, 0, []))

  return {
    isValid: errors.length === 0,
    errors,
  }
}
