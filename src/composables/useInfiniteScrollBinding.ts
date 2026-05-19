import type { UseInfiniteScrollReturn } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import { toValue } from 'vue'

export interface UseInfiniteScrollBindingOptions {
  /**
   * 触发加载的距离阈值（px）
   *
   * 注意：vueuse 的 useInfiniteScroll 仅在初始化时读取 distance，
   * 后续变化不会生效，因此即便接受 ref/getter 也只在 setup 阶段求值一次
   */
  distance: MaybeRefOrGetter<number>
  /**
   * 是否允许继续加载
   * @default () => true
   */
  canLoadMore?: MaybeRefOrGetter<boolean>
  /** 触发加载的回调 */
  onLoadMore: () => void | Promise<void>
  /**
   * 触发方向
   * @default 'bottom'
   */
  direction?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * 两次触发之间的最小间隔（ms）
   * @default 100
   */
  interval?: number
}

/**
 * 基于 vueuse `useInfiniteScroll` 的薄包装
 *
 * 主要价值：把 `canLoadMore` 暴露为 `MaybeRefOrGetter<boolean>`，
 * 避免调用方重复写 `() => ...` 闭包；并原样透传 `direction` / `interval`
 * 与 `useInfiniteScroll` 的返回值（`isLoading` / `reset`）。
 *
 * @category Composables
 * @example
 * ```ts
 * const { isLoading, reset } = useInfiniteScrollBinding(
 *   () => listRef.value,
 *   {
 *     distance: 100,
 *     canLoadMore: () => hasMore.value,
 *     onLoadMore: () => fetchNextPage()
 *   }
 * )
 * ```
 */
export function useInfiniteScrollBinding(
  getEl: () => HTMLElement | null | undefined,
  options: UseInfiniteScrollBindingOptions,
): UseInfiniteScrollReturn {
  return useInfiniteScroll(
    getEl,
    () => options.onLoadMore(),
    {
      distance: toValue(options.distance),
      canLoadMore: () => (options.canLoadMore == null ? true : toValue(options.canLoadMore)),
      direction: options.direction,
      interval: options.interval,
    },
  )
}
