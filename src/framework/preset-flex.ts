const directionMap: Record<string, string> = {
  'row': 'row',
  'col': 'column',
  'row-reverse': 'row-reverse',
  'col-reverse': 'column-reverse',
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const alignItemsMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
}

const directions = Object.keys(directionMap)
const justifies = Object.keys(justifyMap)
const aligns = Object.keys(alignItemsMap)

const flexComboRule = [
  new RegExp(`^(?:inline-)?flex-(${directions.join('|')})(?:-(${justifies.join('|')}))?(?:-(${aligns.join('|')}))?$`),
  ([, d, j, a]: string[], { rawSelector }: { rawSelector: string }): Record<string, string> => {
    const styles: Record<string, string> = {
      display: rawSelector.startsWith('inline-') ? 'inline-flex' : 'flex',
    }
    if (d && directionMap[d])
      styles['flex-direction'] = directionMap[d]

    if (j && justifyMap[j])
      styles['justify-content'] = justifyMap[j]

    if (a && alignItemsMap[a])
      styles['align-items'] = alignItemsMap[a]

    return styles
  },
  {
    autocomplete: `(inline-)?flex-(${directions.join('|')})(-(${justifies.join('|')}))?(-(${aligns.join('|')}))?`,
  },
]

/**
 * UnoCSS Flex布局预设，提供便捷的flex布局工具类
 *
 * @category Framework
 * @returns UnoCSS预设配置对象
 * @example
 * ```ts
 * // 在unocss.config.ts中使用
 * import { presetFlex } from '@movk/core'
 *
 * export default defineConfig({
 *   presets: [
 *     presetFlex(),
 *     // 其他预设...
 *   ]
 * })
 *
 * // 在HTML中使用生成的类名
 * <div class="flex-row-center-center">居中的flex容器</div>
 * <div class="flex-col-between-start">纵向分散对齐</div>
 * <div class="flex-center">完全居中</div>
 * <div class="flex-x-center">水平居中</div>
 * <div class="flex-y-center">垂直居中</div>
 * ```
 */
export function presetFlex() {
  return {
    name: '@movk/preset-flex',
    rules: [
      flexComboRule,
      ['flex-center', { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' }],
      ['inline-flex-center', { 'display': 'inline-flex', 'justify-content': 'center', 'align-items': 'center' }],
    ],
    shortcuts: [
      {
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'inline-flex-x-center': 'inline-flex justify-center',
        'inline-flex-y-center': 'inline-flex items-center',
      },
    ],
  }
}
