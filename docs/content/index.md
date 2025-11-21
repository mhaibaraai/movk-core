---
seo:
  title: 现代 Vue.js 高性能实用工具集
  description: 一个为现代 Vue.js 应用量身打造的高性能实用工具与组合式函数集合。全面拥抱 TypeScript，轻量、可摇树，为您的项目注入更多活力与效率。
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
ui:
  container: lg:py-20
---
#top
:hero-background

#title
:::motion
现代 Vue.js [高性能]{.text-primary}实用工具集.
:::

#description
:::motion
---
transition: { duration: 0.6, delay: 0.3 }
---
为现代 Vue.js 应用量身打造的实用工具与组合式函数集合。全面拥抱 TypeScript，轻量、可摇树，为您的项目注入更多活力与效率。
:::

#links
:::motion{class="flex flex-wrap gap-x-6 gap-y-3"}
---
transition: { duration: 0.6, delay: 0.5 }
---
  ::::u-button
  ---
  to: /docs/getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  快速入门
  ::::

  ::::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: outline
  size: xl
  to: https://github.com/mhaibaraai/movk-core
  target: _blank
  ---
  GitHub
  ::::
:::

#default
:home

::

::u-page-section{class="dark:bg-neutral-950"}
#title
特性一览

#description
`@movk/core` 提供了一套全面的、经过严格测试的实用工具和组合式函数，旨在简化您的日常开发工作。

#features
  :::u-page-feature
  ---
  icon: i-lucide-square-dashed
  ---
  #title
  50+ 实用工具

  #description
  从数组、对象、字符串操作到异步控制与树形结构处理，提供丰富、高效的函数，覆盖各种常见场景。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-square-function
  ---
  #title
  组合式函数

  #description
  提供 `useAppStorage`、`useCopyCode` 等即用型组合式函数，轻松集成响应式能力。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list-tree
  ---
  #title
  强大的树形结构工具

  #description
  内置高效的树形数据结构处理工具，轻松实现查找、遍历、过滤、转换等复杂操作。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  ---
  #title
  类型安全

  #description
  全面使用 TypeScript 编写，提供卓越的类型推断和代码提示，确保您的应用稳健可靠。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-package-check
  ---
  #title
  轻量与可摇树

  #description
  精心设计的模块化结构，支持摇树优化（Tree-Shaking），仅打包您需要的代码，减小应用体积。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-code-2
  ---
  #title
  现代 ESM

  #description
  原生支持 ES Modules，无缝融入现代前端工程化体系，适用于 Vite、Nuxt 等各种环境。
  :::
::
