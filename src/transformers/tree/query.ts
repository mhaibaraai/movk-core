import type { TreeConfigInput, TreeNode, TreePredicate } from './types'
import { bfsGenerator, dfsGenerator, parseTreeConfig, selectStrategy } from './helpers'

/**
 * 查找树中第一个满足条件的节点
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param predicate 查找条件函数
 * @param config 树形配置选项
 * @returns 匹配的节点；未找到时返回undefined
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     name: '部门1',
 *     children: [
 *       { id: '2', name: '部门1-1', children: [] }
 *     ]
 *   }
 * ]
 *
 * const result = find(tree, ({ node }) => node.name === '部门1-1')
 * console.log(result?.id) // '2'
 * ```
 */
export function find<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  predicate: TreePredicate<T>,
  config: TreeConfigInput = {},
): TreeNode<T> | undefined {
  const nodes = Array.isArray(tree) ? tree : [tree]
  const strategy = selectStrategy('find')

  const generator = strategy === 'dfs'
    ? dfsGenerator(nodes, config)
    : bfsGenerator(nodes, config)

  for (const result of generator) {
    if (predicate({ node: result.node, depth: result.depth, path: result.path, index: result.index })) {
      return result.node
    }
  }
  return undefined
}

/**
 * 查找树中所有满足条件的节点
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param predicate 查找条件函数
 * @param config 树形配置选项
 * @returns 所有匹配的节点数组
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     type: 'folder',
 *     name: '根目录',
 *     children: [
 *       { id: '2', type: 'file', name: '文件1', children: [] },
 *       { id: '3', type: 'file', name: '文件2', children: [] }
 *     ]
 *   }
 * ]
 *
 * const files = findAll(tree, ({ node }) => node.type === 'file')
 * console.log(files.length) // 2
 * ```
 */
export function findAll<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  predicate: TreePredicate<T>,
  config: TreeConfigInput = {},
): TreeNode<T>[] {
  const nodes = Array.isArray(tree) ? tree : [tree]
  const strategy = selectStrategy('findAll')
  const results: TreeNode<T>[] = []

  const generator = strategy === 'dfs'
    ? dfsGenerator(nodes, config)
    : bfsGenerator(nodes, config)

  for (const result of generator) {
    if (predicate({ node: result.node, depth: result.depth, path: result.path, index: result.index })) {
      results.push(result.node)
    }
  }

  return results
}

/**
 * 根据ID查找树中的节点
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param id 要查找的节点ID
 * @param config 树形配置选项
 * @returns 匹配的节点；未找到时返回undefined
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
 * const result = findById(tree, '2')
 * console.log(result?.name) // '子节点'
 * ```
 */
export function findById<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  id: string,
  config: TreeConfigInput = {},
): TreeNode<T> | undefined {
  const { id: idKey } = parseTreeConfig(config)

  return find(tree, ({ node }) => (node as any)[idKey] === id, config)
}
