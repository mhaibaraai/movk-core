import type { AnyObject, OmitByKey, PickByKey } from '../../types'

/**
 * 将对象按指定键分离为两个对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要分离的键数组
 * @returns 包含picked和omitted两个对象的结果
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret',
 *   role: 'admin'
 * }
 *
 * const { picked, omitted } = separate(user, ['id', 'name'])
 * console.log(picked) // { id: 1, name: 'John' }
 * console.log(omitted) // { email: 'john@example.com', password: 'secret', role: 'admin' }
 *
 * // 用于分离敏感信息
 * const { picked: publicData, omitted: privateData } = separate(user, ['id', 'name', 'email'])
 * ```
 */
export function separate<T extends AnyObject, K extends keyof T>(
  obj: T,
  keys: K[],
): { picked: PickByKey<T, K>, omitted: OmitByKey<T, K> } {
  if (!obj || typeof obj !== 'object') {
    return {
      picked: {} as PickByKey<T, K>,
      omitted: {} as OmitByKey<T, K>,
    }
  }

  if (keys.length === 0) {
    return {
      picked: {} as PickByKey<T, K>,
      omitted: { ...obj } as OmitByKey<T, K>,
    }
  }

  const keysSet = new Set(keys)
  const picked = {} as PickByKey<T, K>
  const omitted = {} as OmitByKey<T, K>

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const typedKey = key as keyof T
      if (keysSet.has(typedKey as K)) {
        (picked as AnyObject)[key] = obj[typedKey]
      }
      else {
        (omitted as AnyObject)[key] = obj[typedKey]
      }
    }
  }

  return { picked, omitted }
}

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
