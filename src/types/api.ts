/**
 * 异步工具类型：统一同步/异步返回与类型提取
 */
export type ApiAwaitable<T> = T | Promise<T>
export type ApiUnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type ApiAwaitedReturn<TFn> = TFn extends (...args: any[]) => ApiAwaitable<infer R> ? R : never
