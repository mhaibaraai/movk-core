import type { TreeConfigInput, TreeNode, TreePredicate, TreeTransformer } from './types'
import { parseTreeConfig } from './helpers'

/**
 * 过滤树形结构，保留满足条件的节点及其祖先和后代
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param predicate 过滤条件函数，接收对象参数 {node, depth, path, index}
 * @param config 树形配置选项
 * @returns 过滤后的树形结构数组
 * @example
 * ```ts
 * const tree = [
 *   {
 *     id: '1',
 *     type: 'folder',
 *     name: '根目录',
 *     children: [
 *       { id: '2', type: 'file', name: '文档.txt', children: [] },
 *       { id: '3', type: 'folder', name: '子目录', children: [
 *         { id: '4', type: 'file', name: '图片.jpg', children: [] }
 *       ] }
 *     ]
 *   }
 * ]
 *
 * const filtered = filter(tree, ({ node }) => node.type === 'file')
 * // 返回包含所有文件节点及其父级路径的树结构
 * ```
 */
export function filter<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  predicate: TreePredicate<T>,
  config: TreeConfigInput = {},
): TreeNode<T>[] {
  const { children: childrenKey } = parseTreeConfig(config)

  const nodes = Array.isArray(tree) ? tree : [tree]
  const results: TreeNode<T>[] = []

  const traverse = (
    node: TreeNode<T>,
    depth: number,
    path: readonly TreeNode<T>[],
    index: number = 0,
  ): TreeNode<T> | null => {
    const children = node[childrenKey]
    const filteredChildren: TreeNode<T>[] = []

    if (children && children.length > 0) {
      const newPath = [...path, node]
      children.forEach((child: TreeNode<T>, childIndex: number) => {
        const filteredChild = traverse(child, depth + 1, newPath, childIndex)
        if (filteredChild) {
          filteredChildren.push(filteredChild)
        }
      })
    }

    if (predicate({ node, depth, path, index }) || filteredChildren.length > 0) {
      const { [childrenKey]: _, ...nodeData } = node
      return {
        ...nodeData,
        [childrenKey]: filteredChildren,
      } as TreeNode<T>
    }

    return null
  }

  nodes.forEach((node, index) => {
    const filtered = traverse(node, 0, [node], index)
    if (filtered) {
      results.push(filtered)
    }
  })

  return results
}

/**
 * 转换树形结构，将每个节点转换为新的结构
 *
 * @category Tree
 * @param tree 树形结构（单个节点或节点数组）
 * @param transformer 节点转换函数，接收对象参数 {node, depth, path, index}
 * @param config 树形配置选项
 * @returns 转换后的树形结构数组
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
 * const transformed = transform(tree, ({ node, depth }) => ({
 *   key: node.id,
 *   title: node.name,
 *   level: depth
 * }))
 * // 转换为新的数据结构
 * ```
 */
export function transform<T = any, R = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  transformer: TreeTransformer<T, R>,
  config: TreeConfigInput = {},
): TreeNode<R>[] {
  const { children: childrenKey } = parseTreeConfig(config)

  const nodes = Array.isArray(tree) ? tree : [tree]
  const results: TreeNode<R>[] = []

  const traverse = (
    node: TreeNode<T>,
    depth: number,
    path: readonly TreeNode<T>[],
    index: number = 0,
  ): TreeNode<R> => {
    const children = node[childrenKey]
    const transformedChildren: TreeNode<R>[] = []

    if (children && children.length > 0) {
      const newPath = [...path, node]
      children.forEach((child: TreeNode<T>, childIndex: number) => {
        transformedChildren.push(traverse(child, depth + 1, newPath, childIndex))
      })
    }

    const transformed = transformer({ node, depth, path, index })
    const { [childrenKey]: _, ...transformedData } = transformed as any
    return {
      ...transformedData,
      [childrenKey]: transformedChildren,
    } as TreeNode<R>
  }

  nodes.forEach((node, index) => {
    results.push(traverse(node, 0, [node], index))
  })

  return results
}
