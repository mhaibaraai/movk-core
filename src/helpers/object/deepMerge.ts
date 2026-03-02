import type { AnyObject } from '../../types/object'
import { isPlainObject } from '../../validators/isPlainObject'

/**
 * 数组合并策略
 * - `'concat'`  : 将 source 数组拼接在 target 数组之后（默认）
 * - `'replace'` : 用 source 数组整体替换 target 数组
 * - `'unique'`  : 拼接后去重（基于 SameValueZero 比较）
 */
export type ArrayMergeStrategy = 'concat' | 'replace' | 'unique'

/**
 * null/undefined 处理策略
 * - `'skip'`     : 忽略 source 中的 null/undefined，保留 target 中的值（默认）
 * - `'override'` : 允许 source 中的 null/undefined 覆盖 target 中的值
 */
export type NullHandlingStrategy = 'skip' | 'override'

/**
 * 自定义合并函数。
 *
 * @param key       当前正在处理的键（string 或 Symbol）
 * @param targetVal target 中该键的当前值
 * @param sourceVal source 中该键的值
 * @param path      从根对象到当前层级的键路径
 * @returns         返回合并结果；返回 `undefined` 则交由默认逻辑处理
 */
export type CustomMerger = (
  key: string | symbol,
  targetVal: unknown,
  sourceVal: unknown,
  path: ReadonlyArray<string | symbol>,
) => unknown

/**
 * deepMerge 配置选项
 */
export interface DeepMergeOptions {
  /** 数组合并策略，默认 `'concat'` */
  arrayStrategy?: ArrayMergeStrategy
  /** null/undefined 处理策略，默认 `'skip'` */
  nullHandling?: NullHandlingStrategy
  /** 自定义合并函数，返回 `undefined` 则交由默认逻辑处理 */
  customMerger?: CustomMerger
}

/** 需要跳过的危险键，防止原型污染 */
const FORBIDDEN_KEYS = new Set<string>(['__proto__', 'constructor'])

interface ResolvedOptions {
  arrayStrategy: ArrayMergeStrategy
  nullHandling: NullHandlingStrategy
  customMerger: CustomMerger | undefined
}

function resolveOptions(options?: DeepMergeOptions): ResolvedOptions {
  return {
    arrayStrategy: options?.arrayStrategy ?? 'concat',
    nullHandling: options?.nullHandling ?? 'skip',
    customMerger: options?.customMerger,
  }
}

/**
 * 获取对象的所有自有键（string + symbol）
 */
function getOwnKeys(obj: object): Array<string | symbol> {
  return [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj).filter(
      sym => Object.prototype.propertyIsEnumerable.call(obj, sym),
    ),
  ]
}

/**
 * 合并两个对象（内部递归核心）
 */
function mergeTwo(
  target: AnyObject,
  source: AnyObject,
  config: ResolvedOptions,
  path: Array<string | symbol>,
  cache: WeakMap<object, object>,
): AnyObject {
  const result = { ...target }

  for (const key of getOwnKeys(source)) {
    if (typeof key === 'string' && FORBIDDEN_KEYS.has(key))
      continue

    const targetVal = result[key as string]
    const sourceVal = source[key as string]

    // 1. 自定义合并优先
    if (config.customMerger) {
      const customResult = config.customMerger(key, targetVal, sourceVal, path)
      if (customResult !== undefined) {
        ;(result as any)[key] = customResult
        continue
      }
    }

    // 2. null/undefined 处理
    if (sourceVal === null || sourceVal === undefined) {
      if (config.nullHandling === 'skip' && key in result) {
        continue
      }
      ;(result as any)[key] = sourceVal
      continue
    }

    // 3. 数组合并
    if (Array.isArray(sourceVal)) {
      if (Array.isArray(targetVal)) {
        switch (config.arrayStrategy) {
          case 'replace':
            ;(result as any)[key] = [...sourceVal]
            break
          case 'unique':
            ;(result as any)[key] = [...new Set([...targetVal, ...sourceVal])]
            break
          case 'concat':
          default:
            ;(result as any)[key] = [...targetVal, ...sourceVal]
            break
        }
      }
      else {
        ;(result as any)[key] = [...sourceVal]
      }
      continue
    }

    // 4. 纯对象递归合并
    if (isPlainObject(sourceVal)) {
      if (cache.has(sourceVal)) {
        ;(result as any)[key] = cache.get(sourceVal)
        continue
      }

      const nextPath = [...path, key]
      const placeholder: AnyObject = {}
      cache.set(sourceVal, placeholder)

      if (isPlainObject(targetVal)) {
        const merged = mergeTwo(targetVal, sourceVal, config, nextPath, cache)
        Object.assign(placeholder, merged)
        ;(result as any)[key] = placeholder
      }
      else {
        const cloned = mergeTwo({}, sourceVal, config, nextPath, cache)
        Object.assign(placeholder, cloned)
        ;(result as any)[key] = placeholder
      }
      continue
    }

    // 5. 其他类型（原始值、Date、Map、Set、RegExp 等）直接替换
    ;(result as any)[key] = sourceVal
  }

  return result
}

/**
 * 递归地将多个 source 对象深度合并为一个新对象。
 *
 * - 后面的 source 优先级更高，会覆盖前面的同名属性
 * - 双方都是纯对象的属性会递归合并，而非覆盖
 * - 数组合并策略、null 处理和自定义合并函数均可配置
 * - 支持 Symbol 键，防止原型污染（跳过 `__proto__` 和 `constructor`）
 * - 不修改任何输入对象
 *
 * @category Object
 * @typeParam T 合并结果的对象类型
 * @param sources 要合并的源对象数组，后面的对象优先级更高
 * @param options 合并行为配置项（可选）
 * @returns 合并后的新对象
 *
 * @example
 * ```ts
 * const defaults = { theme: 'light', pagination: { page: 1, size: 10 } }
 * const userConfig = { pagination: { size: 20 }, debug: true }
 * const result = deepMerge([defaults, userConfig])
 * // => { theme: 'light', pagination: { page: 1, size: 20 }, debug: true }
 * ```
 *
 * @example
 * ```ts
 * // 数组去重合并
 * const result = deepMerge(
 *   [{ tags: ['a', 'b'] }, { tags: ['b', 'c'] }],
 *   { arrayStrategy: 'unique' },
 * )
 * // => { tags: ['a', 'b', 'c'] }
 * ```
 */
export function deepMerge<T extends AnyObject>(
  sources: T[],
  options?: DeepMergeOptions,
): T {
  if (!Array.isArray(sources))
    return {} as T

  const config = resolveOptions(options)
  const validSources = sources.filter(isPlainObject)

  if (validSources.length === 0)
    return {} as T

  const cache = new WeakMap<object, object>()
  return validSources.reduce<AnyObject>(
    (acc, source) => mergeTwo(acc, source, config, [], cache),
    {},
  ) as T
}

/**
 * 创建一个预绑定配置的 deepMerge 函数。
 *
 * @category Object
 * @param options 合并行为配置项
 * @returns 预配置的 deepMerge 函数
 *
 * @example
 * ```ts
 * const mergeReplace = createDeepMerge({ arrayStrategy: 'replace' })
 * const result = mergeReplace([{ tags: ['a'] }, { tags: ['b'] }])
 * // => { tags: ['b'] }
 * ```
 */
export function createDeepMerge(
  options: DeepMergeOptions,
): <T extends AnyObject>(sources: T[]) => T {
  return <T extends AnyObject>(sources: T[]): T => deepMerge(sources, options)
}
