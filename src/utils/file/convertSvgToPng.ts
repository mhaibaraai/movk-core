/**
 * 将SVG字符串转换为PNG格式的Blob对象
 *
 * @category File
 * @param svg SVG字符串
 * @returns PNG格式的Blob对象
 * @throws 当SVG无效或转换失败时抛出错误
 * @example
 * ```ts
 * const svgString = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'
 *
 * try {
 *   const pngBlob = await convertSvgToPng(svgString)
 *   const url = URL.createObjectURL(pngBlob)
 *
 *   // 用于下载或显示
 *   const img = document.createElement('img')
 *   img.src = url
 *   document.body.appendChild(img)
 * } catch (error) {
 *   console.error('SVG转换失败:', error)
 * }
 * ```
 */
export async function convertSvgToPng(svg: string): Promise<Blob> {
  if (!svg || typeof svg !== 'string') {
    throw new Error('Invalid SVG string provided')
  }

  // 检查是否在浏览器环境中
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new TypeError('convertSvgToPng is only available in browser environment')
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    img.onload = () => {
      try {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          }
          else {
            reject(new Error('Failed to convert canvas to Blob'))
          }
        }, 'image/png')
      }
      catch (error) {
        reject(new Error(`Error during canvas conversion: ${error}`))
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load SVG image'))
    }

    try {
      img.src = `data:image/svg+xml;base64,${btoa(svg)}`
    }
    catch (error) {
      reject(new Error(`Failed to encode SVG: ${error}`))
    }
  })
}
