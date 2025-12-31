/**
 * 内部辅助函数和生成器
 * 这些函数仅供库内部使用，不对外暴露
 */

import type { TreeConfig, TreeConfigInput, TreeNode } from './types'

// 内部类型定义
interface TreeNodeResult<T = any> {
  readonly node: TreeNode<T>
  readonly path: readonly TreeNode<T>[]
  readonly depth: number
  readonly index: number
}

// 默认配置
const DEFAULT_TREE_CONFIG: TreeConfig = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

/**
 * 解析树形配置，应用默认值（内部使用）
 */
function parseTreeConfig(config: TreeConfigInput = {}): TreeConfig {
  return {
    id: config.id ?? DEFAULT_TREE_CONFIG.id,
    pid: config.pid ?? DEFAULT_TREE_CONFIG.pid,
    children: config.children ?? DEFAULT_TREE_CONFIG.children,
  }
}

/**
 * DFS生成器（内部使用）
 */
function* dfsGenerator<T = any>(
  nodes: TreeNode<T>[],
  config: TreeConfigInput = {},
  path: TreeNode<T>[] = [],
): Generator<TreeNodeResult<T>> {
  const { children: childrenKey } = parseTreeConfig(config)
  let index = 0

  for (const node of nodes) {
    const currentPath = [...path, node]
    yield { node, path: currentPath, depth: path.length, index: index++ }

    const children = node[childrenKey]
    if (children && children.length > 0) {
      yield* dfsGenerator(children, config, currentPath)
    }
  }
}

/**
 * BFS生成器（内部使用）
 */
function* bfsGenerator<T = any>(
  nodes: TreeNode<T>[],
  config: TreeConfigInput = {},
): Generator<TreeNodeResult<T>> {
  const { children: childrenKey } = parseTreeConfig(config)
  const queue: TreeNodeResult<T>[] = nodes.map((node, index) => ({
    node,
    path: [node],
    depth: 0,
    index,
  }))

  let index = nodes.length

  while (queue.length > 0) {
    const current = queue.shift()!
    yield current

    const children = current.node[childrenKey]
    if (children && children.length > 0) {
      children.forEach((child: TreeNode<T>) => {
        const childPath = [...current.path, child]
        queue.push({
          node: child,
          path: childPath,
          depth: current.depth + 1,
          index: index++,
        })
      })
    }
  }
}

/**
 * 选择遍历策略（内部使用）
 */
function selectStrategy(
  operation: 'find' | 'findAll' | 'filter' | 'transform' | 'forEach' | 'stats' | 'validate',
): 'dfs' | 'bfs' {
  // 大多数操作使用DFS，因为它内存效率更高，适合树结构操作
  switch (operation) {
    case 'find':
    case 'findAll':
    case 'filter':
    case 'transform':
    case 'forEach':
    case 'stats':
    case 'validate':
      return 'dfs'
    default:
      return 'dfs'
  }
}

// 导出供内部模块使用
export { bfsGenerator, dfsGenerator, parseTreeConfig, selectStrategy }
export type { TreeNodeResult }
