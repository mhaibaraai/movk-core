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

/**
 * 触发浏览器下载文件
 *
 * @category File
 * @param blob 文件数据
 * @param filename 文件名
 * @example
 * ```ts
 * // 下载文本文件
 * const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
 * triggerDownload(textBlob, 'hello.txt')
 *
 * // 下载JSON数据
 * const data = { name: 'John', age: 30 }
 * const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
 * triggerDownload(jsonBlob, 'data.json')
 *
 * // 下载图片
 * const canvas = document.createElement('canvas')
 * canvas.toBlob((blob) => {
 *   if (blob) {
 *     triggerDownload(blob, 'image.png')
 *   }
 * })
 * ```
 */
export function triggerDownload(blob: Blob, filename: string): void {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('triggerDownload: Not available in server environment')
    return
  }

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
