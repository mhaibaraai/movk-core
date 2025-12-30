/**
 * 从响应头中提取文件名
 *
 * @category File
 * @param headers 响应头对象
 * @param fallbackName 默认文件名
 * @returns 提取的文件名
 * @example
 * ```ts
 * // 从响应头中提取文件名
 * const headers = new Headers({
 *   'content-disposition': 'attachment; filename="report.pdf"'
 * })
 * const filename = extractFilename(headers, 'download')
 * console.log(filename) // 'report.pdf'
 *
 * // 处理编码的文件名
 * const encodedHeaders = new Headers({
 *   'content-disposition': 'attachment; filename*=UTF-8\'\'%E6%8A%A5%E5%91%8A.pdf'
 * })
 * const encodedFilename = extractFilename(encodedHeaders)
 * console.log(encodedFilename) // '报告.pdf'
 * ```
 */
export function extractFilename(headers?: Headers, fallbackName = 'file'): string {
  if (!headers)
    return fallbackName

  const disposition = headers.get('content-disposition')
  if (disposition) {
    const filenameMatch = disposition.match(/filename\*?=(?:"([^"]+)"|([^;]+))/i)
    if (filenameMatch) {
      let filename = filenameMatch[1] ?? filenameMatch[2]
      if (!filename)
        return fallbackName

      if (filename.startsWith('"') && filename.endsWith('"'))
        filename = filename.slice(1, -1)

      // 处理 RFC 5987 编码的文件名
      if (disposition.includes('filename*=')) {
        const parts = filename.split('\'\'')
        if (parts.length === 2 && parts[1]) {
          try {
            filename = decodeURIComponent(parts[1])
          }
          catch {
            // 解码失败时回退
            return fallbackName
          }
        }
      }
      return filename
    }
  }
  return fallbackName
}
