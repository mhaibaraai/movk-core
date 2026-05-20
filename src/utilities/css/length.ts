/**
 * 把 CSS 长度字符串折算为像素
 *
 * 支持 `px` / `rem` / `em`，rem/em 按 16 折算；无单位视为 px；无法识别时回退到 fallback。
 *
 * @category Css
 * @param value CSS 长度字符串，如 `'16px'`、`'1rem'`、`'2.5em'`
 * @param fallback 回退像素值，默认 16
 * @returns 折算后的像素数值
 * @example
 * ```ts
 * lengthToPx('1rem')   // 16
 * lengthToPx('24px')   // 24
 * lengthToPx('2.5em')  // 40
 * lengthToPx('auto')   // 16 (fallback)
 * lengthToPx('', 0)    // 0 (custom fallback)
 * ```
 */
export function lengthToPx(value: string, fallback = 16): number {
  if (!value) return fallback
  const matched = value.trim().match(/^(-?(?:\d+\.\d+|\.\d+|\d+))\s*(px|rem|em)?$/i)
  if (!matched) return fallback
  const num = Number.parseFloat(matched[1]!)
  const unit = (matched[2] ?? 'px').toLowerCase()
  return unit === 'rem' || unit === 'em' ? num * 16 : num
}
