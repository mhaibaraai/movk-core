/**
 * 依据键名从对象类型 `T` 中剔除键 `K`。
 * @typeParam T - 源对象类型
 * @typeParam K - 要剔除的键(必须来自 `keyof T`)
 * @example
 * // type User = { id: string; name: string; age: number }
 * // type R = OmitByKey<User, 'age'>
 * // 结果: R 为 { id: string; name: string }
 */
export type OmitByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
}

/**
 * 依据键名从对象类型 `T` 中挑选键 `K`。
 * @typeParam T - 源对象类型
 * @typeParam K - 要保留的键(必须来自 `keyof T`)
 * @example
 * // type User = { id: string; name: string; age: number }
 * // type R = PickByKey<User, 'id' | 'name'>
 * // 结果: R 为 { id: string; name: string }
 */
export type PickByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
}

/**
 * 基于映射表 `Mapping` 对对象类型 `T` 的键进行重命名。
 * 未在映射表中的键保持原名; 映射值为 `PropertyKey`(string/number/symbol)。
 * @typeParam T - 源对象类型
 * @typeParam Mapping - 旧键到新键名的映射
 * @example
 * // type Src = { a: number; b: string }
 * // type R = RenameKeys<Src, { a: 'id' }>
 * // 结果: R 为 { id: number; b: string }
 */
export type RenameKeys<T, Mapping extends { [K in keyof T]?: PropertyKey }> = {
  [K in keyof T as K extends keyof Mapping ? Exclude<Mapping[K], undefined> : K]: T[K];
}

/**
 * 将对象类型 `T` 中的键 `K` 标记为必填(移除可选修饰)。
 * @typeParam T - 源对象类型
 * @typeParam K - 设为必填的键
 * @example
 * // type User = { id: string; name?: string }
 * // type R = RequiredByKeys<User, 'name'>
 * // 结果: R['name'] 为必填的 string
 */
export type RequiredByKeys<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
}

/**
 * 将对象类型 `T` 中的键 `K` 标记为可选。
 * @typeParam T - 源对象类型
 * @typeParam K - 设为可选的键
 * @example
 * // type User = { id: string; name: string }
 * // type R = PartialByKeys<User, 'name'>
 * // 结果: R['name'] 为可选(可能为 undefined)
 */
export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 将对象类型 `T` 中的键 `K` 标记为只读(浅只读)。
 * @typeParam T - 源对象类型
 * @typeParam K - 设为只读的键
 * @example
 * // type User = { id: string; name: string }
 * // type R = ReadonlyByKeys<User, 'id'>
 * // 结果: R['id'] 不可被重新赋值
 */
export type ReadonlyByKeys<T, K extends keyof T> = T & {
  readonly [P in K]: T[P];
}

/**
 * 取消对象类型 `T` 中键 `K` 的只读限制，使其可写(浅层)。
 * @typeParam T - 源对象类型
 * @typeParam K - 取消只读的键
 * @example
 * // type User = { readonly id: string; name: string }
 * // type R = MutableByKeys<User, 'id'>
 * // 结果: R['id'] 变为可写
 */
export type MutableByKeys<T, K extends keyof T> = {
  -readonly [P in K]: T[P];
} & Omit<T, K>
