/**
 * 将联合类型 `U` 转换为交叉类型，用于合并联合成员的属性。
 * @typeParam U - 联合类型
 * @example
 * // type U = { a: number } | { b: string }
 * // type R = UnionToIntersection<U>
 * // 结果: R 为 { a: number } & { b: string }
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? {
  [K in keyof I]: I[K];
} : never

/**
 * 若对象 `T` 在键 `K` 处的类型为元组，则提取其首个元素类型，否则为 `never`。
 * @typeParam T - 具有元组属性的对象类型
 * @typeParam K - 属性键
 * @example
 * // type Cfg = { params: [id: string, flag?: boolean] }
 * // type R = FirstParam<Cfg, 'params'>
 * // 结果: R 为 string
 */
export type FirstParam<T, K extends keyof T> = T[K] extends [infer P, ...any[]] ? P : never

/**
 * 从函数类型中提取首个参数类型; 若 `T` 非函数类型，则为 `undefined`。
 * @typeParam T - 函数类型
 * @example
 * // type Fn = (x: number, y: string) => void
 * // type R = FirstParameter<Fn>
 * // 结果: R 为 number; 若 T 非函数，则为 undefined
 */
export type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : undefined

/**
 * 强制 TypeScript 展平类型别名，使 IntelliSense 能完整枚举对象的所有属性。
 *
 * 常用于消除交叉类型（`A & B`）的「折叠」显示，让 IDE 悬停时直接展示合并后的属性列表。
 *
 * @typeParam T - 要展平的对象类型
 * @example
 * ```ts
 * type A = { a: number } & { b: string }
 * // IDE hover 显示 "{ a: number } & { b: string }"
 *
 * type B = Prettify<A>
 * // IDE hover 显示 "{ a: number; b: string }"
 * ```
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}

/**
 * 从对象类型中提取所有字面量键，过滤掉索引签名（`string`、`number`、`symbol`）。
 *
 * 用于需要精确枚举已知属性而不被索引签名污染 IntelliSense 的场景。
 *
 * @typeParam T - 可能含索引签名的对象类型
 * @example
 * ```ts
 * interface Config {
 *   debug: boolean
 *   timeout: number
 *   [key: string]: unknown
 * }
 * // K = 'debug' | 'timeout'（索引签名 string 被过滤掉）
 * type K = KnownKeys<Config>
 * ```
 */
export type KnownKeys<T> = {
  [K in keyof T]-?: string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K
}[keyof T]
