import type { MaybeRefOrGetter } from 'vue'

/**
 * 提供字面量提示的同时允许任意同类原始值
 *
 * @example
 * ```ts
 * type Color = Suggest<'red' | 'blue'>  // 'red' | 'blue' | (string & {})
 * type Status = Suggest<200 | 404>      // 200 | 404 | (number & {})
 * type Mixed = Suggest<'a' | 1>         // 'a' | 1 | (string & {}) | (number & {})
 *
 * const color1: Color = 'red'    // 有提示
 * const color2: Color = 'yellow' // 也允许
 * ```
 */
export type Suggest<T extends string | number | bigint>
  = | T
    | (T extends string ? string & {} : never)
    | (T extends number ? number & {} : never)
    | (T extends bigint ? bigint & {} : never)

/**
 * 允许值 T 或一个返回 T 的函数；显式传入 Ctx 时回调会接收上下文参数
 *
 * @template T - 值类型
 * @template Ctx - 上下文类型，省略时回调为无参函数
 *
 * @example
 * ```ts
 * type A = MaybeFn<string>           // string | (() => string)
 * type B = MaybeFn<string, Context>  // string | ((ctx: Context) => string)
 *
 * const a1: A = 'static'
 * const a2: A = () => 'computed'
 * const b1: B = 'static'
 * const b2: B = ctx => ctx.dynamicValue
 * ```
 */
export type MaybeFn<T, Ctx = never> = [Ctx] extends [never]
  ? T | (() => T)
  : T | ((ctx: Ctx) => T)

/**
 * 响应式值类型 - 基于 Vue 的 `MaybeRefOrGetter` 扩展，额外支持上下文回调
 *
 * @template T - 值类型
 * @template CTX - 上下文类型（用于回调函数）
 *
 * @example
 * ```ts
 * const value: ReactiveValue<boolean> = ref(false)
 * const getter: ReactiveValue<string> = () => name.value
 * const computed: ReactiveValue<number> = computed(() => count.value)
 * const withContext: ReactiveValue<boolean, Context> = (ctx) => ctx.value > 0
 * ```
 */
export type ReactiveValue<T, CTX = never> = [CTX] extends [never]
  ? MaybeRefOrGetter<T>
  : MaybeRefOrGetter<T> | ((ctx: CTX) => T)

export type StripNullable<T> = T extends null | undefined ? never : T

/**
 * 检测类型 T 是否为 `any`
 *
 * 利用 `any` 会穿透类型运算的特性（`1 & any` 为 `any`，`0 extends any` 为 `true`）实现检测。
 *
 * @example
 * ```ts
 * type A = IsAny<any>     // true
 * type B = IsAny<string>  // false
 * type C = IsAny<never>   // false
 * type D = IsAny<unknown> // false
 * ```
 */
export type IsAny<T> = 0 extends (1 & T) ? true : false

/**
 * 将字面量类型宽化为其对应的基础类型，同时保留可选性（`undefined`）。
 *
 * - `any` → 保持原样
 * - `undefined | never` → `unknown`
 * - `boolean` 字面量 → `boolean`
 * - `string` 字面量 → `string`
 * - 其他类型 → 保持原样
 *
 * 主要用于工厂方法的 props 推断，防止 SFC 泛型默认参数产生的字面量类型污染调用签名。
 *
 * @example
 * ```ts
 * type A = WidenLiteral<'hello'>           // string
 * type B = WidenLiteral<true>              // boolean
 * type C = WidenLiteral<'foo' | undefined> // string | undefined
 * type D = WidenLiteral<number>            // number
 * ```
 */
export type WidenLiteral<T>
  = IsAny<T> extends true ? T
    : [NonNullable<T>] extends [never] ? unknown
        : NonNullable<T> extends boolean ? boolean | Extract<T, undefined>
          : NonNullable<T> extends string ? string | Extract<T, undefined>
            : T
