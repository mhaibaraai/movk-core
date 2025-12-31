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
