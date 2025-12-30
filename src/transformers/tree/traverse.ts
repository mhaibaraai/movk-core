import type { TreeConfigInput, TreeNode, TreeVisitor } from './types'
import { bfsGenerator, dfsGenerator, selectStrategy } from './helpers'

/**
 * 遍历树形结构的每个节点
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param visitor 访问者函数，接收对象参数 {node, depth, path, index}，返回false可以跳过子节点的遍历
 * @param config 树形配置选项
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
 * forEach(tree, ({ node, depth }) => {
 *   console.log(`${' '.repeat(depth * 2)}${node.name}`)
 *   // 输出缩进的树结构
 * })
 * ```
 */
export function forEach<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  visitor: TreeVisitor<T>,
  config: TreeConfigInput = {},
): void {
  const nodes = Array.isArray(tree) ? tree : [tree]
  const strategy = selectStrategy('forEach')

  const generator = strategy === 'dfs'
    ? dfsGenerator(nodes, config)
    : bfsGenerator(nodes, config)

  for (const result of generator) {
    const shouldContinue = visitor({ node: result.node, depth: result.depth, path: result.path, index: result.index })
    if (shouldContinue === false) {
      break
    }
  }
}
