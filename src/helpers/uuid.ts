/**
 * 生成随机UUID字符串
 *
 * @category Helpers
 * @returns 符合UUID v4格式的随机字符串
 * @example
 * ```ts
 * const id1 = getRandomUUID()
 * console.log(id1) // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 *
 * const id2 = getRandomUUID()
 * console.log(id2) // 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
 *
 * // 用于生成唯一标识符
 * const componentId = `component-${getRandomUUID()}`
 * ```
 */
export function getRandomUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
