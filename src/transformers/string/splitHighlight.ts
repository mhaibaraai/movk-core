/**
 * 高亮片段，`match` 标记该片段是否命中关键字。
 */
export interface HighlightSegment {
  text: string
  match: boolean
}

/**
 * 按关键字将文本切分为命中/未命中片段，便于渲染高亮。
 *
 * 匹配不区分大小写，命中片段保留原始大小写；关键字为空或文本不含关键字时返回整段未命中。
 *
 * @category String
 * @param text 源文本
 * @param term 关键字
 * @returns 片段数组，依次拼接即为原文本
 * @example
 * ```ts
 * splitHighlight('ABC', 'b')
 * // [{ text: 'A', match: false }, { text: 'B', match: true }, { text: 'C', match: false }]
 * ```
 */
export function splitHighlight(text: string, term: string): HighlightSegment[] {
  if (!term.trim() || !text)
    return [{ text, match: false }]

  const lower = text.toLowerCase()
  const needle = term.toLowerCase()
  const segments: HighlightSegment[] = []
  let cursor = 0

  for (let index = lower.indexOf(needle); index !== -1; index = lower.indexOf(needle, cursor)) {
    if (index > cursor)
      segments.push({ text: text.slice(cursor, index), match: false })
    segments.push({ text: text.slice(index, index + needle.length), match: true })
    cursor = index + needle.length
  }

  if (cursor < text.length)
    segments.push({ text: text.slice(cursor), match: false })

  return segments.length > 0 ? segments : [{ text, match: false }]
}
