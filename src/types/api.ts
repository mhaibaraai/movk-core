/**
 * 统一同步/异步返回类型
 * @typeParam T - 类型
 * @example
 * // type T = string | Promise<string>
 * // type R = ApiAwaitable<T>
 * // 结果：R 为 string | Promise<string>
 */
export type ApiAwaitable<T> = T | Promise<T>

/**
 * 提取Promise类型
 * @typeParam T - 类型
 * @example
 * // type T = Promise<string>
 * // type R = ApiUnwrapPromise<T>
 * // 结果：R 为 string
 */
export type ApiUnwrapPromise<T> = T extends Promise<infer U> ? U : T

/**
 * 提取函数返回类型
 * @typeParam TFn - 函数类型
 * @example
 * // type Fn = (x: number, y: string) => Promise<string>
 * // type R = ApiAwaitedReturn<Fn>
 * // 结果：R 为 string
 */
export type ApiAwaitedReturn<TFn> = TFn extends (...args: any[]) => ApiAwaitable<infer R> ? R : never
