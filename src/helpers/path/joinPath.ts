/**
 * 将片段数组序列化为路径字符串。
 *
 * 规则:
 * - 合法标识符段使用点拼接(a.b.c)
 * - 数字段转为索引([0])
 * - 其它需要转义的键使用方括号引号(['x.y']),并转义 \\ 与 '\''
 *
 * @category Path
 * @param segments 路径片段数组
 * @returns 路径字符串
 * @example
 * ```ts
 * const p = joinPath(['a', 'x.y', 0, 'space key'])
 * // p: "a['x.y'][0]['space key']"
 * // 与解析往返:toPath(p) => ['a', 'x.y', 0, 'space key']
 * ```
 */
export function joinPath(segments: (string | number)[]): string {
  let out = ''
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    if (typeof seg === 'number' && Number.isInteger(seg) && seg >= 0) {
      out += `[${seg}]`
      continue
    }
    const s = String(seg)
    // 合法标识符:以字母/$_ 开始,后续字母/数字/$_,且不包含点
    const isIdentifier = /^[A-Z_$][\w$]*$/i.test(s)
    if (out.length === 0 && isIdentifier) {
      out += s
      continue
    }
    if (isIdentifier) {
      out += `.${s}`
      continue
    }
    // 需要括号引号并转义
    const escaped = s.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')
    out += `['${escaped}']`
  }
  return out
}
