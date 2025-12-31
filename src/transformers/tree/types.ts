/**
 * 树节点类型定义
 *
 * @template T 节点数据类型
 */
export type TreeNode<T = any> = T & {
  children?: TreeNode<T>[]
  [key: string]: any
}

/**
 * 树形配置类型
 */
export interface TreeConfig {
  id: string
  pid: string
  children: string
}

/**
 * 树形配置输入类型
 */
export type TreeConfigInput = Partial<TreeConfig>

/**
 * 树统计信息类型
 */
export interface TreeStats {
  total: number
  leaves: number
  depth: number
  branches: number
}

/**
 * 树节点谓词函数类型
 *
 * @template T 节点数据类型
 * @param params 包含节点信息的对象参数
 * @param params.node 当前节点
 * @param params.depth 节点深度（从0开始）
 * @param params.path 从根节点到当前节点的路径数组
 * @param params.index 节点在同级节点中的索引
 * @returns 是否满足条件
 */
export type TreePredicate<T = any> = (params: {
  node: TreeNode<T>
  depth: number
  path: readonly TreeNode<T>[]
  index: number
}) => boolean

/**
 * 树节点转换函数类型
 *
 * @template T 源节点数据类型
 * @template R 目标节点数据类型
 * @param params 包含节点信息的对象参数
 * @param params.node 当前节点
 * @param params.depth 节点深度（从0开始）
 * @param params.path 从根节点到当前节点的路径数组
 * @param params.index 节点在同级节点中的索引
 * @returns 转换后的节点数据
 */
export type TreeTransformer<T = any, R = any> = (params: {
  node: TreeNode<T>
  depth: number
  path: readonly TreeNode<T>[]
  index: number
}) => R

/**
 * 树节点访问函数类型
 *
 * @template T 节点数据类型
 * @param params 包含节点信息的对象参数
 * @param params.node 当前节点
 * @param params.depth 节点深度（从0开始）
 * @param params.path 从根节点到当前节点的路径数组
 * @param params.index 节点在同级节点中的索引
 * @returns 返回false可以终止遍历或跳过子节点
 */
export type TreeVisitor<T = any> = (params: {
  node: TreeNode<T>
  depth: number
  path: readonly TreeNode<T>[]
  index: number
}) => void | boolean
