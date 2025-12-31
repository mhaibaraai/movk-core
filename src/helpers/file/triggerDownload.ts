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
