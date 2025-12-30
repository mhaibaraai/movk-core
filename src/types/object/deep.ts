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
