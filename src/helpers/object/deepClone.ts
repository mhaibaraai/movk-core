/**
 * 深拷贝任意 JavaScript 值。
 *
 * - 优先使用原生 `structuredClone`（若可用），覆盖 `Map`/`Set`/`TypedArray`/`ArrayBuffer` 等内建类型。
 * - 对不支持 `structuredClone` 的环境，使用回退实现：
 *   - 支持循环引用（`WeakMap` 记忆化）。
 *   - 保留原型与属性描述符（含 getter/setter），复制 symbol 键。
 *   - 内建类型专项处理：`Date`/`RegExp`/`Map`/`Set`/`ArrayBuffer`/`TypedArray`/`URL`/`Error`。
 *
 * @category Object
 * @typeParam T 拷贝值的类型
 * @param obj 要被深拷贝的值
 * @param cache 内部使用的 `WeakMap`（循环引用记忆化），一般不需要传入
 * @returns 新的深拷贝值，与输入值结构等价、引用独立
 *
 * @example
 * ```ts
 * const source = { a: 1, d: new Date(), m: new Map([[1, { x: 2 }]]) }
 * const cloned = deepClone(source)
 * cloned !== source // true
 * cloned.d !== source.d // true
 * cloned.m !== source.m // true
 * cloned.m.get(1) !== source.m.get(1) // true
 * ```
 *
 * @remarks
 * 若对象包含不可克隆资源（如带有原生句柄的自定义对象），请在外层进行自定义序列化逻辑或为该类型添加专用分支。
 */
export function deepClone<T>(obj: T, cache = new WeakMap<object, any>()): T {
  if (obj === null || typeof obj !== 'object')
    return obj

  // 优先使用原生 structuredClone（覆盖 Map/Set/TypedArray 等）
  try {
    const sc = (globalThis as any).structuredClone
    if (typeof sc === 'function')
      return sc(obj)
  }
  catch (e) {
    console.error('Error occurred while cloning:', e)
  }

  const asObj = obj as unknown as object
  const hit = cache.get(asObj)
  if (hit)
    return hit as T

  // Date
  if (obj instanceof Date)
    return new Date(obj.getTime()) as T

  // RegExp
  if (obj instanceof RegExp)
    return new RegExp(obj.source, obj.flags) as T

  // Map
  if (obj instanceof Map) {
    const cloned = new Map()
    cache.set(asObj, cloned)
    for (const [k, v] of obj.entries())
      cloned.set(deepClone(k as any, cache), deepClone(v as any, cache))
    return cloned as unknown as T
  }

  // Set
  if (obj instanceof Set) {
    const cloned = new Set()
    cache.set(asObj, cloned)
    for (const v of obj.values())
      cloned.add(deepClone(v as any, cache))
    return cloned as unknown as T
  }

  // ArrayBuffer
  if (obj instanceof ArrayBuffer)
    return obj.slice(0) as T

  // TypedArray / DataView
  if (ArrayBuffer.isView(obj)) {
    const Ctor = (obj as any).constructor as new (src: any) => any
    return new Ctor(obj) as T
  }

  // URL
  if (obj instanceof URL)
    return new URL(obj.toString()) as T

  // Error
  if (obj instanceof Error) {
    const err = new (obj as any).constructor(obj.message)
    err.name = obj.name
    err.stack = obj.stack
    return err as T
  }

  // Array
  if (Array.isArray(obj)) {
    const out: any[] = []
    cache.set(asObj, out)
    for (const item of obj)
      out.push(deepClone(item as any, cache))
    return out as unknown as T
  }

  // Object：保留原型与属性描述符，复制 symbol 键
  const proto = Object.getPrototypeOf(obj)
  const cloned = Object.create(proto)
  cache.set(asObj, cloned)

  const keys = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj) as any,
  ]

  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(obj, key as any)
    if (!desc)
      continue
    if ('value' in desc)
      desc.value = deepClone((obj as any)[key as any], cache)
    Object.defineProperty(cloned, key, desc)
  }

  return cloned
}
