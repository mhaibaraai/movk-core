import { clamp } from './clamp'

export interface MapRangeOptions {
  /**
   * 是否把结果钳制到 `outRange` 区间内
   * @defaultValue false
   */
  clamp?: boolean
}

/**
 * 把数值从一个区间线性映射到另一个区间
 *
 * 默认对越界输入线性外推，传 `{ clamp: true }` 则把结果限制在 `outRange` 内。
 * 两个区间都允许倒序书写（如 `[20, 4]`），钳制同样成立。
 * `inRange` 两端相等时比例无从确定，返回 `outRange` 的首端而非除零结果。
 *
 * @category Math
 * @param value 待映射的数值
 * @param inRange 输入区间 `[min, max]`
 * @param outRange 输出区间 `[min, max]`
 * @param options 映射行为配置
 * @returns 映射后的数值
 * @example
 * ```ts
 * mapRange(5, [0, 10], [0, 100])                   // 50
 * mapRange(20, [0, 10], [0, 100])                  // 200（默认外推）
 * mapRange(20, [0, 10], [0, 100], { clamp: true }) // 100
 * mapRange(5, [0, 10], [20, 4])                    // 12（倒序输出区间）
 * ```
 * @example
 * ```ts
 * // 按度数映射节点尺寸，超出统计区间的极值不应撑破视觉上限
 * const size = mapRange(degree, [minDegree, maxDegree], [4, 20], { clamp: true })
 * ```
 */
export function mapRange(
  value: number,
  inRange: readonly [number, number],
  outRange: readonly [number, number],
  options?: MapRangeOptions,
): number {
  const [inMin, inMax] = inRange
  const [outMin, outMax] = outRange

  const span = inMax - inMin
  const ratio = span === 0 ? 0 : (value - inMin) / span
  const mapped = outMin + ratio * (outMax - outMin)

  return options?.clamp ? clamp(mapped, outMin, outMax) : mapped
}
