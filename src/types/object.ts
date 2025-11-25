import type { VNode } from 'vue'

export type UnknownObject = Record<string, unknown>
export type AnyObject = Record<string, any>

/**
 * 依据键名从对象类型 `T` 中剔除键 `K`。
 * @typeParam T - 源对象类型
 * @typeParam K - 要剔除的键（必须来自 `keyof T`）
 * @example
 * // type User = { id: string; name: string; age: number }
 * // type R = OmitByKey<User, 'age'>
 * // 结果：R 为 { id: string; name: string }
 */
export type OmitByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
}

/**
 * 依据键名从对象类型 `T` 中挑选键 `K`。
 * @typeParam T - 源对象类型
 * @typeParam K - 要保留的键（必须来自 `keyof T`）
 * @example
 * // type User = { id: string; name: string; age: number }
 * // type R = PickByKey<User, 'id' | 'name'>
 * // 结果：R 为 { id: string; name: string }
 */
export type PickByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
}

/**
 * 基于映射表 `Mapping` 对对象类型 `T` 的键进行重命名。
 * 未在映射表中的键保持原名；映射值为 `PropertyKey`（string/number/symbol）。
 * @typeParam T - 源对象类型
 * @typeParam Mapping - 旧键到新键名的映射
 * @example
 * // type Src = { a: number; b: string }
 * // type R = RenameKeys<Src, { a: 'id' }>
 * // 结果：R 为 { id: number; b: string }
 */
export type RenameKeys<T, Mapping extends { [K in keyof T]?: PropertyKey }> = {
  [K in keyof T as K extends keyof Mapping ? Exclude<Mapping[K], undefined> : K]: T[K];
}

/**
 * 将对象类型 `T` 中的键 `K` 标记为必填（移除可选修饰）。
 * @typeParam T - 源对象类型
 * @typeParam K - 设为必填的键
 * @example
 * // type User = { id: string; name?: string }
 * // type R = RequiredByKeys<User, 'name'>
 * // 结果：R['name'] 为必填的 string
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
 * // 结果：R['name'] 为可选（可能为 undefined）
 */
export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 将对象类型 `T` 中的键 `K` 标记为只读（浅只读）。
 * @typeParam T - 源对象类型
 * @typeParam K - 设为只读的键
 * @example
 * // type User = { id: string; name: string }
 * // type R = ReadonlyByKeys<User, 'id'>
 * // 结果：R['id'] 不可被重新赋值
 */
export type ReadonlyByKeys<T, K extends keyof T> = T & {
  readonly [P in K]: T[P];
}

/**
 * 取消对象类型 `T` 中键 `K` 的只读限制，使其可写（浅层）。
 * @typeParam T - 源对象类型
 * @typeParam K - 取消只读的键
 * @example
 * // type User = { readonly id: string; name: string }
 * // type R = MutableByKeys<User, 'id'>
 * // 结果：R['id'] 变为可写
 */
export type MutableByKeys<T, K extends keyof T> = {
  -readonly [P in K]: T[P];
} & Omit<T, K>

/**
 * 将联合类型 `U` 转换为交叉类型，用于合并联合成员的属性。
 * @typeParam U - 联合类型
 * @example
 * // type U = { a: number } | { b: string }
 * // type R = UnionToIntersection<U>
 * // 结果：R 为 { a: number } & { b: string }
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
 * // 结果：R 为 string
 */
export type FirstParam<T, K extends keyof T> = T[K] extends [infer P, ...any[]] ? P : never

/**
 * 从函数类型中提取首个参数类型；若 `T` 非函数类型，则为 `undefined`。
 * @typeParam T - 函数类型
 * @example
 * // type Fn = (x: number, y: string) => void
 * // type R = FirstParameter<Fn>
 * // 结果：R 为 number；若 T 非函数，则为 undefined
 */
export type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : undefined

/**
 * 递归将对象类型 `T` 的所有属性变为可选（深可选）。
 * @typeParam T - 源对象类型
 * @example
 * // type Src = { a: { b: number } }
 * // type R = DeepPartial<Src>
 * // 结果：R 为 { a?: { b?: number | undefined } | undefined }
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
}

/**
 * 当 `MaybeObject` 为对象时，返回键 `Key` 对应的属性类型；否则为 `never`。
 * @typeParam MaybeObject - 可能为对象的类型
 * @typeParam Key - 目标键名（string）
 * @example
 * // type Obj = { id: number }
 * // type R1 = GetObjectField<Obj, 'id'> // 结果：number
 * // type R2 = GetObjectField<string, 'id'> // 结果：never
 */
export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any> ? MaybeObject[Key] : never

/**
 * Vue 渲染相关文本/节点类型：可为字符串、`VNode` 或返回 `VNode` 的函数。
 * @example
 * // 在渲染 API 中允许三种形态：
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

/**
 * 深度控制类型，用于限制类型递归的深度
 * 防止类型计算超出 TypeScript 的递归限制
 */
type Depth = [never, 0, 1, 2, 3, 4]

/**
 * 提取对象的嵌套键，支持点语法路径
 *
 * @template T 源对象类型
 * @template D 递归深度，默认为2
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   address: {
 *     city: string
 *     country: string
 *   }
 * }
 * type Keys = NestedKeys<User> // 'name' | 'address' | 'address.city' | 'address.country'
 * ```
 */
export type NestedKeys<T, D extends number = 2> = [D] extends [never]
  ? never
  : {
      [K in keyof T & string]: IsPlainObject<T[K]> extends true
        ? K | `${K}.${NestedKeys<NonNullable<T[K]>, Depth[D]>}`
        : K
    }[keyof T & string]

/**
 * 提取对象中所有纯对象字段的键（包括嵌套的），支持点语法路径
 *
 * @template T 源对象类型
 * @template D 递归深度，默认为2
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 *   address: {
 *     city: string
 *     location: {
 *       lat: number
 *       lng: number
 *     }
 *   }
 * }
 * type ObjectKeys = ObjectFieldKeys<User> // 'address' | 'address.location'
 * ```
 */
export type ObjectFieldKeys<T, D extends number = 2> = [D] extends [never]
  ? never
  : {
      [K in keyof T & string]: IsPlainObject<T[K]> extends true
        ? K | `${K}.${ObjectFieldKeys<NonNullable<T[K]>, Depth[D]>}`
        : never
    }[keyof T & string]

/**
 * 提取对象中所有非对象字段的键
 * 排除纯对象字段，只保留原始类型字段的键
 *
 * @template T 源对象类型
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 *   address: {
 *     city: string
 *   }
 * }
 * type NonObjectKeys = NonObjectFieldKeys<User> // 'name' | 'age' | 'address.city'
 * ```
 */
export type NonObjectFieldKeys<T> = Exclude<NestedKeys<T>, ObjectFieldKeys<T>>

/**
 * 提取对象中所有数组字段的键（包括嵌套的），支持点语法路径
 *
 * @template T 源对象类型
 * @template D 递归深度，默认为2
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   tags: string[]
 *   posts: Array<{ title: string }>
 *   profile: {
 *     hobbies: string[]
 *   }
 * }
 * type ArrayKeys = ArrayFieldKeys<User> // 'tags' | 'posts' | 'profile.hobbies'
 * ```
 */
export type ArrayFieldKeys<T, D extends number = 2> = [D] extends [never]
  ? never
  : {
      [K in keyof T & string]: NonNullable<T[K]> extends any[]
        ? K
        : IsPlainObject<T[K]> extends true
          ? `${K}.${ArrayFieldKeys<NonNullable<T[K]>, Depth[D]>}`
          : never
    }[keyof T & string]

/**
 * 根据路径字符串提取对象属性的类型，支持点语法和嵌套对象
 * @example GetFieldValue<User, 'tags'> // string[]
 * @example GetFieldValue<User, 'profile.bio'> // string
 */
export type GetFieldValue<T, P extends string>
  = P extends keyof T
    ? T[P]
    : P extends `${infer K}.${infer Rest}`
      ? K extends keyof T
        ? T[K] extends undefined ? undefined : GetFieldValue<NonNullable<T[K]>, Rest>
        : unknown
      : unknown
