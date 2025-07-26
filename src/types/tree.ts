import { z } from 'zod/v4'

const _TreeNodeBaseSchema = z.record(z.string(), z.any())
export type TreeNodeBase = z.infer<typeof _TreeNodeBaseSchema>

export type TreeNode<T extends TreeNodeBase = TreeNodeBase> = T & {
  [K in TreeConfig['children']]: TreeNode<T>[]
}

export const TreeConfigSchema = z.object({
  id: z.string().default('id'),
  pid: z.string().default('pid'),
  children: z.string().default('children'),
})

export type TreeConfig = z.infer<typeof TreeConfigSchema>
export type TreeConfigInput = z.input<typeof TreeConfigSchema>

export const TreeStatsSchema = z.object({
  total: z.number().int().nonnegative(),
  leaves: z.number().int().nonnegative(),
  depth: z.number().int().nonnegative(),
  branches: z.number().int().nonnegative(),
})

export type TreeStats = z.infer<typeof TreeStatsSchema>

export interface TreeNodeResult<T extends TreeNodeBase = TreeNodeBase> {
  readonly node: TreeNode<T>
  readonly path: readonly TreeNode<T>[]
  readonly depth: number
  readonly index: number
}

export type TreePredicate<T extends TreeNodeBase = TreeNodeBase> = (
  node: TreeNode<T>,
  depth: number,
  path: readonly TreeNode<T>[]
) => boolean

export type TreeTransformer<
  T extends TreeNodeBase = TreeNodeBase,
  R extends TreeNodeBase = TreeNodeBase,
> = (
  node: TreeNode<T>,
  depth: number,
  path: readonly TreeNode<T>[]
) => R

export type TreeVisitor<T extends TreeNodeBase = TreeNodeBase> = (
  node: TreeNode<T>,
  depth: number,
  path: readonly TreeNode<T>[]
) => void | boolean
