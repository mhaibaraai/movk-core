import type { MaybeRefOrGetter } from 'vue'

/**
 * 提供字符串字面量提示的同时允许任意字符串
 * 在 IDE 中提供 T 类型的自动补全提示，但不限制只能使用这些值
 *
 * @example
 * ```ts
 * type Color = Suggest<'red' | 'blue' | 'green'>
 *
 * // IDE 会提示 'red', 'blue', 'green'，但也可以使用其他字符串
 * const color1: Color = 'red'    // 有提示
 * const color2: Color = 'yellow' // 也可以，虽然没有提示
 * ```
 */
export type Suggest<T extends string> = T | (string & {})

/**
 * 允许值 T 或一个返回 T 的函数，函数接收一个上下文参数
 *
 * @template T - 值类型
 * @template Ctx - 上下文类型（用于回调函数）
 *
 * @example
 * ```ts
 * type Config = {
 *   value: MaybeFn<string, Context>
 * }
 *
 * const config1: Config = { value: 'static' } // 直接使用值
 * const config2: Config = { value: (ctx) => ctx.dynamicValue } // 使用函数根据上下文计算值
 * ```
 */
export type MaybeFn<T, Ctx> = T | ((ctx: Ctx) => T)

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
