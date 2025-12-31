/**
 * 替换SVG文件中的currentColor为指定颜色
 *
 * @category File
 * @param path SVG文件路径
 * @param color 替换的颜色值，不提供则返回原始SVG
 * @returns 处理后的SVG字符串
 * @throws 当文件获取失败或SVG无效时抛出错误
 * @example
 * ```ts
 * // 获取并替换SVG中的currentColor
 * try {
 *   const svgContent = await replaceCurrentColor('/icons/star.svg', '#ff0000')
 *   const container = document.createElement('div')
 *   container.innerHTML = svgContent
 *   document.body.appendChild(container)
 * } catch (error) {
 *   console.error('SVG处理失败:', error)
 * }
 *
 * // 只获取SVG内容，不替换颜色
 * const originalSvg = await replaceCurrentColor('/icons/star.svg')
 * ```
 */
export async function replaceCurrentColor(path: string, color?: string): Promise<string> {
  if (!path || typeof path !== 'string') {
    throw new Error('Invalid SVG path provided')
  }

  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to fetch SVG file: ${response.status} ${response.statusText}`)
    }

    const svgText = await response.text()

    if (!color) {
      return svgText
    }

    // 检查是否在浏览器环境中（只有在需要操作DOM时才检查）
    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
      console.warn('replaceCurrentColor: DOM manipulation not available in server environment, returning original SVG')
      return svgText
    }

    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')

    const parseError = svgDoc.querySelector('parsererror')
    if (parseError) {
      throw new Error('Invalid SVG content')
    }

    const svgElement = svgDoc.querySelector('svg')
    if (!svgElement) {
      throw new Error('No SVG element found in the document')
    }

    if (!svgElement.hasAttribute('fill')) {
      svgElement.setAttribute('fill', 'currentColor')
    }

    const traverseAndReplace = (element: Element): void => {
      if (element.getAttribute('fill') === 'currentColor') {
        element.setAttribute('fill', color)
      }

      if (element.getAttribute('stroke') === 'currentColor') {
        element.setAttribute('stroke', color)
      }

      Array.from(element.children).forEach((child) => {
        traverseAndReplace(child)
      })
    }

    traverseAndReplace(svgElement)

    const serializer = new XMLSerializer()
    return serializer.serializeToString(svgDoc)
  }
  catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Unexpected error occurred: ${error}`)
  }
}
