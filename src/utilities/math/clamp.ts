/**
 * 将数值钳制到闭区间内
 *
 * `min` 大于 `max` 时静默交换两端，因此调用方无需保证入参顺序；`value` 为 `NaN` 时返回 `NaN`。
 *
 * @category Math
 * @param value 待钳制的数值
 * @param min 区间一端
 * @param max 区间另一端
 * @returns 落入区间内的数值
 * @example
 * ```ts
 * clamp(15, 0, 10)  // 10
 * clamp(-5, 0, 10)  // 0
 * clamp(5, 0, 10)   // 5
 * clamp(15, 10, 0)  // 10（两端自动交换）
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  const lower = Math.min(min, max)
  const upper = Math.max(min, max)
  return Math.min(Math.max(value, lower), upper)
}
