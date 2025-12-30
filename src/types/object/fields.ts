import type { IsPlainObject } from './basic'

/**
 * 深度控制类型，用于限制类型递归的深度
 * 防止类型计算超出 TypeScript 的递归限制
 */
type Depth = [never, 0, 1, 2, 3, 4]

/**
 * 当 `MaybeObject` 为对象时，返回键 `Key` 对应的属性类型; 否则为 `never`。
 * @typeParam MaybeObject - 可能为对象的类型
 * @typeParam Key - 目标键名(string)
 * @example
 * // type Obj = { id: number }
 * // type R1 = GetObjectField<Obj, 'id'> // 结果: number
 * // type R2 = GetObjectField<string, 'id'> // 结果: never
 */
export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any> ? MaybeObject[Key] : never

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
 * 提取对象中所有纯对象字段的键(包括嵌套的)，支持点语法路径
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
 * 提取对象中所有数组字段的键(包括嵌套的)，支持点语法路径
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
