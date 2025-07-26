interface RuleContext {
  rawSelector: string
}

function toEscapedSelector(selector: string): string {
  return selector.replace(/[.:#[\]()]/g, '\\$&')
}

/**
 * UnoCSS 猫头鹰选择器预设，提供基于相邻兄弟选择器的间距和分隔符工具类
 *
 * @category Framework
 * @returns UnoCSS预设配置对象
 * @example
 * ```ts
 * // 在unocss.config.ts中使用
 * import { presetOwl } from '@movk/core'
 *
 * export default defineConfig({
 *   presets: [
 *     presetOwl(),
 *     // 其他预设...
 *   ]
 * })
 *
 * // 在HTML中使用生成的类名
 * <div class="owl-y-4">
 *   <div>项目1</div>
 *   <div>项目2</div>  <!-- 上边距 1rem -->
 *   <div>项目3</div>  <!-- 上边距 1rem -->
 * </div>
 *
 * <div class="owl-x-2">
 *   <span>按钮1</span>
 *   <span>按钮2</span>  <!-- 左边距 0.5rem -->
 *   <span>按钮3</span>  <!-- 左边距 0.5rem -->
 * </div>
 *
 * <div class="owl-divide-gray-200">
 *   <div>列表项1</div>
 *   <div>列表项2</div>  <!-- 上边框分隔线 -->
 *   <div>列表项3</div>  <!-- 上边框分隔线 -->
 * </div>
 * ```
 */
export function presetOwl() {
  return {
    name: '@movk/preset-owl',
    rules: [
      // 垂直猫头鹰选择器 (owl-y-*)
      [
        /^owl-y-(.+)$/,
        ([, value]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!value)
            return
          const spacing = parseSpacing(value)
          if (!spacing)
            return

          const selector = toEscapedSelector(rawSelector)
          // 返回完整的 CSS 字符串
          return `${selector} > * + * { margin-block-start: ${spacing}; }`
        },
        { autocomplete: 'owl-y-<num>' },
      ],

      // 水平猫头鹰选择器 (owl-x-*)
      [
        /^owl-x-(.+)$/,
        ([, value]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!value)
            return
          const spacing = parseSpacing(value)
          if (!spacing)
            return

          const selector = toEscapedSelector(rawSelector)
          return `${selector} > * + * { margin-inline-start: ${spacing}; }`
        },
        { autocomplete: 'owl-x-<num>' },
      ],

      // 逻辑属性支持 - 块级方向 (owl-block-*)
      [
        /^owl-block-(.+)$/,
        ([, value]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!value)
            return
          const spacing = parseSpacing(value)
          if (!spacing)
            return

          const selector = toEscapedSelector(rawSelector)
          return `${selector} > * + * { margin-block-start: ${spacing}; }`
        },
        { autocomplete: 'owl-block-<num>' },
      ],

      // 逻辑属性支持 - 内联方向 (owl-inline-*)
      [
        /^owl-inline-(.+)$/,
        ([, value]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!value)
            return
          const spacing = parseSpacing(value)
          if (!spacing)
            return

          const selector = toEscapedSelector(rawSelector)
          return `${selector} > * + * { margin-inline-start: ${spacing}; }`
        },
        { autocomplete: 'owl-inline-<num>' },
      ],

      // 递归猫头鹰选择器 (owl-recursive-*)
      [
        /^owl-recursive-(.+)$/,
        ([, value]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!value)
            return
          const spacing = parseSpacing(value)
          if (!spacing)
            return

          const selector = toEscapedSelector(rawSelector)
          return `${selector} * + * { margin-block-start: ${spacing}; }`
        },
        { autocomplete: 'owl-recursive-<num>' },
      ],

      // 边框分隔符 (owl-divide-*)
      [
        /^owl-divide-(.+)$/,
        ([, value]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!value)
            return
          const borderColor = parseColor(value) || '#e5e7eb'
          const selector = toEscapedSelector(rawSelector)
          return `${selector} > * + * { border-block-start: 1px solid ${borderColor}; }`
        },
        { autocomplete: 'owl-divide-<color>' },
      ],

      // 自定义分隔符样式 (owl-divide-style-*)
      [
        /^owl-divide-style-(.+)$/,
        ([, style]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!style)
            return
          if (!['solid', 'dashed', 'dotted', 'double', 'none'].includes(style))
            return
          const selector = toEscapedSelector(rawSelector)
          return `${selector} > * + * { border-block-start-style: ${style}; }`
        },
        { autocomplete: 'owl-divide-style-<style>' },
      ],

      // 分隔符宽度 (owl-divide-width-*)
      [
        /^owl-divide-width-(.+)$/,
        ([, width]: string[], { rawSelector }: RuleContext): string | undefined => {
          if (!width)
            return
          const borderWidth = parseSpacing(width) || width
          const selector = toEscapedSelector(rawSelector)
          return `${selector} > * + * { border-block-start-width: ${borderWidth}; }`
        },
        { autocomplete: 'owl-divide-width-<num>' },
      ],
    ],
    shortcuts: [
      // 常用组合快捷方式
      {
        'owl-stack': 'owl-y-4', // 默认垂直堆叠
        'owl-stack-tight': 'owl-y-2', // 紧密堆叠
        'owl-stack-loose': 'owl-y-8', // 宽松堆叠
        'owl-list': 'owl-x-4', // 水平列表
        'owl-list-tight': 'owl-x-2', // 紧密水平列表
        'owl-nav': 'owl-x-6', // 导航间距
        'owl-card-stack': 'owl-y-4 owl-divide-gray-200', // 卡片堆叠
      },
    ],
  }
}

function parseSpacing(value: string): string | undefined {
  // 处理数字值 (转换为 rem)
  if (/^\d+(?:\.\d+)?$/.test(value)) {
    const num = Number.parseFloat(value)
    return `${num * 0.25}rem` // 1 = 0.25rem (与 Tailwind 一致)
  }

  // 处理带单位的值
  if (/^\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|ch|ex)$/.test(value)) {
    return value
  }

  // 处理预设值（只保留最常用的）
  const presets: Record<string, string> = {
    auto: 'auto',
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
  }

  return presets[value]
}

function parseColor(value: string): string | undefined {
  // 处理十六进制颜色
  if (/^#[0-9a-f]{3,8}$/i.test(value)) {
    return value
  }

  // 处理 rgb/rgba
  if (/^rgba?(?:\(|$)/.test(value)) {
    return value
  }

  // 处理常见颜色名称（只保留最常用的）
  const colors: Record<string, string> = {
    'transparent': 'transparent',
    'current': 'currentColor',
    'black': '#000000',
    'white': '#ffffff',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-500': '#6b7280',
    'gray-700': '#374151',
    'red-500': '#ef4444',
    'blue-500': '#3b82f6',
    'green-500': '#10b981',
  }

  return colors[value]
}
