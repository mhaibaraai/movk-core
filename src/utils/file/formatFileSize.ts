/**
 * 格式化文件大小，将字节数转换为可读的文件大小字符串
 *
 * @category File
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 * @example
 * ```ts
 * console.log(formatFileSize(1024)) // '1 KB'
 * console.log(formatFileSize(1536)) // '1.5 KB'
 * console.log(formatFileSize(1048576)) // '1 MB'
 * console.log(formatFileSize(1073741824)) // '1 GB'
 *
 * // 处理边界情况
 * console.log(formatFileSize(0)) // '0 Bytes'
 * console.log(formatFileSize(-100)) // '0 Bytes'
 * ```
 */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '0 Bytes'
  }

  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  if (i >= sizes.length) {
    return `${Number.parseFloat((bytes / k ** (sizes.length - 1)).toFixed(2))} ${sizes[sizes.length - 1]}`
  }

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}
