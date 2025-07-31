/**
 * 复制文本到剪贴板的组合式函数
 *
 * @category Composables
 * @param text 要复制的文本内容
 * @returns 复制是否成功的Promise
 * @example
 * ```ts
 * // 复制简单文本
 * const copyText = async () => {
 *   const success = await useCopyCode('Hello, World!')
 *   if (success) {
 *     console.log('复制成功')
 *   } else {
 *     console.log('复制失败')
 *   }
 * }
 *
 * // 复制代码块
 * const copyCodeBlock = async () => {
 *   const code = `
 *   function hello() {
 *     console.log('Hello, World!')
 *   }
 *   `
 *   const success = await useCopyCode(code)
 *   if (success) {
 *     // 显示复制成功提示
 *     showNotification('代码已复制到剪贴板')
 *   }
 * }
 *
 * // 在点击事件中使用
 * const handleCopy = () => {
 *   useCopyCode(document.getElementById('code').textContent)
 * }
 * ```
 */
export async function useCopyCode(text: string): Promise<boolean> {
  if (typeof text !== 'string') {
    throw new TypeError('Text must be a string')
  }

  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    console.warn('useCopyCode: Not available in server environment')
    return false
  }

  // 现代 Clipboard API 方式
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    }
    catch (error) {
      console.warn('Clipboard API failed, falling back to legacy method:', error)
    }
  }

  // 回退到传统方法
  try {
    return copyTextLegacy(text)
  }
  catch (error) {
    console.error('Failed to copy text:', error)
    return false
  }
}

function copyTextLegacy(text: string): boolean {
  // 再次检查浏览器环境（双重保险）
  if (typeof document === 'undefined') {
    console.warn('copyTextLegacy: Document not available')
    return false
  }

  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement
  const selection = document.getSelection()
  const originalRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  try {
    element.value = text

    // 移动端优化：防止虚拟键盘弹出
    element.setAttribute('readonly', '')
    element.setAttribute('contenteditable', 'true')

    // 样式设置：隐藏元素但保持可选择
    Object.assign(element.style, {
      contain: 'strict',
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      fontSize: '12pt', // 防止 iOS 缩放
      border: '0',
      padding: '0',
      margin: '0',
      outline: 'none',
      boxShadow: 'none',
      background: 'transparent',
    })

    document.body.appendChild(element)

    // 选择文本
    element.focus()
    element.select()

    // iOS 兼容性：显式设置选择范围
    if (element.setSelectionRange) {
      element.setSelectionRange(0, text.length)
    }

    // 执行复制命令
    const successful = document.execCommand('copy')

    return successful
  }
  catch (error) {
    console.error('Legacy copy method failed:', error)
    return false
  }
  finally {
    // 清理工作
    if (element.parentNode) {
      document.body.removeChild(element)
    }

    // 恢复原有选择
    if (originalRange && selection) {
      selection.removeAllRanges()
      selection.addRange(originalRange)
    }

    // 恢复焦点
    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus()
    }
  }
}
