import type { PathInput } from './to-path'
import { isValidContainer } from '../../validators/is-valid-container'
import { toPath } from './to-path'

/**
 * 在对象指定路径写入值。缺失路径会被自动创建:
 * - 下一段为 number(索引)时创建数组
 * - 下一段为 string(属性)时创建对象
 *
 * 若中途遇到非容器类型(如字符串/数值/布尔),会被替换为正确的容器以继续写入。
 *
 * @category Path
 * @param object 目标对象(原地修改并返回同一引用)
 * @param path 路径字符串或片段数组
 * @param value 要写入的值
 * @returns 原对象(已修改)
 * @example
 * ```ts
 * const obj: any = {}
 * setPath(obj, 'a.b[0].c', 7)
 * // obj => { a: { b: [{ c: 7 }] } }
 *
 * setPath(obj, 'a.b[2].d', 8)
 * // 数组自动扩容到长度 3
 * // obj.a.b[2] => { d: 8 }
 *
 * setPath(obj, 'a.0.b', 1) // 点语法数字键保持为字符串键
 * // obj => { a: { 0: { b: 1 } } }
 * setPath(obj, 'a[0].b', 2) // 索引用方括号
 * // obj.a[0].b => 2
 * ```
 */
export function setPath<T extends Record<string, any>>(object: T, path: PathInput, value: unknown): T {
  const segments = toPath(path)
  if (segments.length === 0)
    return object

  let cur: any = object as any
  for (let i = 0; i < segments.length; i++) {
    const key = segments[i]
    const isLast = i === segments.length - 1

    if (isLast) {
      cur[key as any] = value
      break
    }

    const nextKey = segments[i + 1]
    let nextVal = cur[key as any]

    // 决定需要的容器类型
    const needArray = typeof nextKey === 'number'
    const isValidObject = isValidContainer(nextVal)

    if (!isValidObject) {
      nextVal = needArray ? [] : {}
      cur[key as any] = nextVal
    }
    else if (needArray && !Array.isArray(nextVal)) {
      nextVal = []
      cur[key as any] = nextVal
    }

    // 如果是数组并且下一个 key 为数字索引,扩容(允许稀疏)
    if (needArray && Array.isArray(nextVal)) {
      const idxNum = Number(nextKey)
      if (Number.isInteger(idxNum) && idxNum >= 0 && nextVal.length <= idxNum)
        nextVal.length = idxNum + 1
    }
    cur = nextVal
  }

  return object
}
