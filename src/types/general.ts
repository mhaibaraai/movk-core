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
