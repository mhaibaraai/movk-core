import type { AnyObject, OmitByKey, PickByKey } from '../../types/object'

/**
 * 将对象按多分组键集合进行分离（浅层），返回各分组与 others
 *
 * - 键冲突策略：先到先得。若同一键出现在多个分组中，则归入第一个匹配到的分组
 * - 仅处理对象自有的浅层键，不解析深层路径
 * - 分组中包含不存在于对象的键将被忽略
 *
 * @category Object
 * @param obj 源对象
 * @param groups 分组映射，如 { a: ['x', 'y'], b: ['z'] }
 * @returns 一个对象，包含每个分组的子对象以及 others（其余未被分组捕获的键）
 * @example
 * ```ts
 * const options = { id: 1, name: 'John', email: 'a@b.com', role: 'admin' }
 * const { a, b, others } = separateMany(options, { a: ['id'], b: ['name'] as const })
 * // a: { id: 1 }
 * // b: { name: 'John' }
 * // others: { email: 'a@b.com', role: 'admin' }
 * ```
 */
export function separateMany<
  T extends AnyObject,
  M extends Record<string, readonly (keyof T)[]>,
>(
  obj: T,
  groups: M,
): { [P in keyof M]: PickByKey<T, M[P][number]> } & { others: OmitByKey<T, M[keyof M][number]> } {
  // 非对象直接返回空分组与空 others
  if (!obj || typeof obj !== 'object') {
    const emptyGroups = Object.fromEntries(
      Object.keys(groups).map(k => [k, {}]),
    ) as { [P in keyof M]: PickByKey<T, M[P][number]> }
    return {
      ...emptyGroups,
      others: {} as OmitByKey<T, M[keyof M][number]>,
    }
  }

  const groupNames = Object.keys(groups) as Array<keyof M>
  const groupKeySets = new Map<keyof M, Set<keyof T>>()
  for (const name of groupNames) {
    const set = new Set<keyof T>(groups[name] as readonly (keyof T)[])
    groupKeySets.set(name, set)
  }

  const result = Object.create(null) as { [P in keyof M]: PickByKey<T, M[P][number]> } & {
    others: OmitByKey<T, M[keyof M][number]>
  }

  // 初始化分组与 others
  for (const name of groupNames) {
    ;(result as any)[name] = {} as PickByKey<T, M[typeof name][number]>
  }
  result.others = {} as OmitByKey<T, M[keyof M][number]>

  // 单次遍历，自有键分配到首个匹配分组，否则进入 others
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const typedKey = key as keyof T
      let assigned = false
      for (const name of groupNames) {
        const set = groupKeySets.get(name)!
        if (set.has(typedKey)) {
          ;((result as any)[name] as AnyObject)[key] = obj[typedKey]
          assigned = true
          break
        }
      }
      if (!assigned) {
        ;(result.others as AnyObject)[key] = obj[typedKey]
      }
    }
  }

  return result
}
