import type { VNode } from 'vue'

export type UnknownObject = Record<string, unknown>
export type AnyObject = Record<string, any>

/**
 * Vue 渲染相关文本/节点类型: 可为字符串、`VNode` 或返回 `VNode` 的函数。
 * @example
 * // 在渲染 API 中允许三种形态:
 * // - '标题'
 * // - h('div', '标题') 产生的 VNode
 * // - () => h('div', '标题') 的惰性渲染函数
 */
export type StringOrVNode = string | VNode | (() => VNode)

/**
 * 合并两个对象类型，U 中的属性会覆盖 T 中的属性
 *
 * @example
 * ```ts
 * type T = { a: number, c: string }
 * type U = { a: string, b: boolean }
 * type M = Merge<T, U> // { a: string, b: boolean, c: string }
 * ```
 */
export type Merge<T, U> = Omit<T, keyof U> & U

/**
 * 判断类型 T 是否为纯对象类型
 * 纯对象是指普通的对象字面量，排除数组、函数、Date 等特殊对象类型
 * @example
 * ```ts
 * type Test1 = IsPlainObject<{ a: number }> // true
 * type Test2 = IsPlainObject<string[]>      // false
 * type Test3 = IsPlainObject<() => void>    // false
 * type Test4 = IsPlainObject<Date>          // false
 * type Test5 = IsPlainObject<string>        // false
 * type Test6 = IsPlainObject<null>          // false
 * ```
 */
export type IsPlainObject<T> = NonNullable<T> extends Record<string, any>
  ? NonNullable<T> extends any[]
    ? false
    : NonNullable<T> extends (...args: any[]) => any
      ? false
      : NonNullable<T> extends Date
        ? false
        : true
  : false
