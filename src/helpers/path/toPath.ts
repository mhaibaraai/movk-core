type PathSegment = string | number
type PathSegments = PathSegment[]
type PathInput = string | PathSegments

/**
 * 将路径字符串解析为片段数组。
 *
 * - 支持点语法与方括号语法混用
 * - 引号键支持单/双引号与反斜杠转义
 * - 方括号内未引号的非负整数字面量解析为 number 段
 * - 点语法中的纯数字段保持字符串(不转为索引)
 *
 * @category Path
 * @param path 路径字符串或片段数组
 * @returns 解析后的片段数组
 * @example
 * ```ts
 * toPath('a.b[0].c') // ['a', 'b', 0, 'c']
 * toPath("a['x.y']") // ['a', 'x.y']
 * ```
 */
export function toPath(path: PathInput): PathSegments {
  if (Array.isArray(path))
    return path.slice()

  const result: PathSegments = []
  if (path === '')
    return result

  // 解析状态机
  let i = 0
  const input = path
  const length = input.length

  // 收集一个点语法段(处理转义 \\ 和 \\.)
  function readDotSegment(start: number): { value: string, next: number } {
    let value = ''
    let j = start
    while (j < length) {
      const ch = input.charCodeAt(j)
      if (ch === 46 /* . */) {
        break
      }
      if (ch === 92 /* \\ */) {
        // 转义下一个字符(例如 \\. 保留 .，\\' 保留 '，\\[ 保留 [ 等)
        j++
        if (j < length)
          value += input[j]
        j++
        continue
      }
      if (ch === 91 /* [ */) {
        // 点段提前结束,交由 bracket 处理
        break
      }
      value += input[j]
      j++
    }
    return { value, next: j }
  }

  // 读取方括号段:支持数字索引、引号键、未引号键
  function readBracket(start: number): { segment: PathSegment | null, next: number } {
    // start 位于 '['
    let j = start + 1
    // 跳过空白
    while (j < length && /\s/.test(input[j]!)) j++
    if (j >= length)
      throw new Error('Invalid path: missing closing "]"')

    const ch = input[j]
    if (ch === '"' || ch === '\'') {
      // 引号键
      const quote = ch
      j++
      let value = ''
      let closed = false
      while (j < length) {
        const c = input.charCodeAt(j)
        if (c === 92 /* \\ */) {
          // 转义字符
          j++
          if (j < length)
            value += input[j]
          j++
          continue
        }
        if (input[j] === quote) {
          closed = true
          j++
          break
        }
        value += input[j]
        j++
      }
      if (!closed)
        throw new Error('Invalid path: missing closing quote in bracket')
      // 跳过空白与右括号
      while (j < length && /\s/.test(input[j]!)) j++
      if (j >= length || input[j] !== ']')
        throw new Error('Invalid path: missing closing "]"')
      j++
      return { segment: value, next: j }
    }

    // 未引号:可能是数字索引或裸键
    let value = ''
    while (j < length && input[j] !== ']') {
      value += input[j]
      j++
    }
    if (j >= length)
      throw new Error('Invalid path: missing closing "]"')
    // 去掉两端空白
    const trimmed = value.trim()
    // 纯十进制非负整数字面量 => number 段
    if (/^(?:0|[1-9]\d*)$/.test(trimmed)) {
      j++
      return { segment: Number(trimmed), next: j }
    }
    // 否则作为字符串键
    j++
    return { segment: trimmed, next: j }
  }

  // 主循环
  while (i < length) {
    const code = input.charCodeAt(i)
    if (code === 46 /* . */) {
      // 跳过连续的点,产生空段意味着空键名
      i++
      continue
    }
    if (code === 91 /* [ */) {
      const { segment, next } = readBracket(i)
      if (segment !== null)
        result.push(segment)
      i = next
      continue
    }
    const { value, next } = readDotSegment(i)
    if (value.length > 0 || (next < length && input[next] === '.'))
      result.push(value)
    i = next
  }

  return result
}

export type { PathInput, PathSegment, PathSegments }
