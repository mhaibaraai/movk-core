import type { MaybeComputedElementRef } from '@vueuse/core'
import type { ComputedRef, DeepReadonly, Ref } from 'vue'
import { useMutationObserver, useResizeObserver } from '@vueuse/core'
import { computed, readonly, ref, toValue, watchEffect } from 'vue'

export interface UseOverflowDetectionOptions {
  /**
   * 是否监听内容变化（MutationObserver）
   *
   * 静态内容场景可关闭以节省开销
   * @default true
   */
  observeContent?: boolean
}

export interface UseOverflowDetectionReturn {
  /** 任一方向溢出 = overflowX || overflowY */
  overflowed: ComputedRef<boolean>
  /** 水平方向是否被截断 */
  overflowX: DeepReadonly<Ref<boolean>>
  /** 垂直方向是否被截断 */
  overflowY: DeepReadonly<Ref<boolean>>
  /** 手动触发一次重新检测 */
  check: () => void
}

/**
 * 检测元素文本内容是否被截断
 *
 * 自动追踪尺寸变化（ResizeObserver）与可选的内容变化（MutationObserver），
 * 并根据 computed style 推断单行 / line-clamp / 通用三种测量策略。调用方
 * 只需在元素上正确应用 truncate / line-clamp CSS，无需额外配置。
 *
 * @category Composables
 * @param target 目标元素引用（支持 ref / 模板 ref / getter）
 * @param options 可选配置
 * @example
 * ```ts
 * const el = useTemplateRef('el')
 * const { overflowed, overflowX, overflowY } = useOverflowDetection(el)
 * ```
 */
export function useOverflowDetection(
  target: MaybeComputedElementRef<HTMLElement | null | undefined>,
  options: UseOverflowDetectionOptions = {},
): UseOverflowDetectionReturn {
  const { observeContent = true } = options
  const overflowX = ref(false)
  const overflowY = ref(false)
  const overflowed = computed(() => overflowX.value || overflowY.value)

  function check(): void {
    if (typeof window === 'undefined') return
    const el = toValue(target)
    if (!el) {
      overflowX.value = false
      overflowY.value = false
      return
    }
    const { x, y } = measureOverflow(el)
    overflowX.value = x
    overflowY.value = y
  }

  watchEffect(() => {
    if (toValue(target)) check()
  })

  useResizeObserver(target, check)

  if (observeContent) {
    useMutationObserver(target, check, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }

  return {
    overflowed,
    overflowX: readonly(overflowX),
    overflowY: readonly(overflowY),
    check,
  }
}

function measureOverflow(el: HTMLElement): { x: boolean, y: boolean } {
  const cs = window.getComputedStyle(el)

  if (isLineClamp(cs)) {
    return { x: false, y: measureHeightWithProbe(el, cs) }
  }

  if (isSingleLineEllipsis(cs)) {
    return { x: measureWidthWithProbe(el, cs), y: false }
  }

  return {
    x: el.scrollWidth > el.clientWidth,
    y: el.scrollHeight > el.clientHeight,
  }
}

function isLineClamp(cs: CSSStyleDeclaration): boolean {
  return (
    cs.display === '-webkit-box'
    && cs.webkitLineClamp !== 'none'
    && cs.webkitLineClamp !== ''
    && cs.webkitLineClamp !== '0'
  )
}

function isSingleLineEllipsis(cs: CSSStyleDeclaration): boolean {
  return (
    cs.whiteSpace === 'nowrap'
    && (cs.textOverflow === 'ellipsis' || cs.overflow === 'hidden')
  )
}

// 屏幕外探针测量自然宽度，绕过 table cell 内 scrollWidth 不可靠的浏览器行为
function measureWidthWithProbe(el: HTMLElement, cs: CSSStyleDeclaration): boolean {
  const probe = document.createElement('span')
  probe.style.cssText = 'position:fixed;top:-9999px;visibility:hidden;white-space:nowrap;pointer-events:none'
  probe.style.font = cs.font
  probe.style.letterSpacing = cs.letterSpacing
  probe.textContent = el.textContent ?? ''
  document.body.appendChild(probe)
  const naturalWidth = probe.getBoundingClientRect().width
  probe.remove()
  return naturalWidth > el.getBoundingClientRect().width
}

// 屏幕外探针测量自然高度，绕过 Chrome 中 -webkit-line-clamp 元素 scrollHeight === clientHeight 的已知 bug
function measureHeightWithProbe(el: HTMLElement, cs: CSSStyleDeclaration): boolean {
  const { width, height } = el.getBoundingClientRect()
  if (width <= 0 || height <= 0) return false
  const probe = document.createElement('div')
  probe.style.cssText = `position:fixed;top:-9999px;visibility:hidden;pointer-events:none;width:${width}px;overflow:visible;white-space:normal`
  probe.style.font = cs.font
  probe.style.letterSpacing = cs.letterSpacing
  probe.style.lineHeight = cs.lineHeight
  probe.style.wordBreak = cs.wordBreak
  probe.style.overflowWrap = cs.overflowWrap
  probe.textContent = el.textContent ?? ''
  document.body.appendChild(probe)
  const naturalHeight = probe.getBoundingClientRect().height
  probe.remove()
  return naturalHeight > height
}
