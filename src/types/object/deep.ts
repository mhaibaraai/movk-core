import type { IsPlainObject } from './basic'

/**
 * 递归将对象类型 `T` 的所有属性变为可选(深可选)。
 * @typeParam T - 源对象类型
 * @example
 * // type Src = { a: { b: number } }
 * // type R = DeepPartial<Src>
 * // 结果: R 为 { a?: { b?: number | undefined } | undefined }
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
}

/** 递归深度计数器，用于限制类型递归层数 */
type MergeDepth = [never, 0, 1, 2, 3, 4]

/**
 * 递归合并两个对象类型，`U` 中的属性优先级高于 `T`。
 * 仅对双方都是纯对象的属性做深度递归，其余类型直接取 `U` 的值。
 *
 * @typeParam T - 基础对象类型
 * @typeParam U - 覆盖对象类型
 * @typeParam D - 递归深度限制，默认为 4
 *
 * @example
 * ```ts
 * type A = { a: { b: number; c: string }; d: boolean }
 * type B = { a: { b: string; e: number }; f: Date }
 * type R = DeepMerge<A, B>
 * // { a: { b: string; c: string; e: number }; d: boolean; f: Date }
 * ```
 */
export type DeepMerge<T, U, D extends number = 4> = [D] extends [never]
  ? T & U
  : {
      [K in keyof T | keyof U]: K extends keyof U
        ? K extends keyof T
          ? IsPlainObject<T[K]> extends true
            ? IsPlainObject<U[K]> extends true
              ? DeepMerge<NonNullable<T[K]>, NonNullable<U[K]>, MergeDepth[D]>
              : U[K]
            : U[K]
          : U[K]
        : K extends keyof T
          ? T[K]
          : never
    }
