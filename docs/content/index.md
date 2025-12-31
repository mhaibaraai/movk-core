---
seo:
  title: 现代 TypeScript 工具函数库
  description: 为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。涵盖数组、对象、字符串、异步操作等多个方面，提供完整的类型定义和 Vue 组合式函数。
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
现代 [TypeScript]{.text-primary} 工具函数库.
:::

#description
:::motion
---
transition: { duration: 0.6, delay: 0.3 }
---
为 TypeScript 项目设计的现代化工具函数库，涵盖数组、对象、字符串、异步操作等多个方面。全面支持 Tree-Shaking，提供完整类型定义和 Vue 组合式函数。
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
`@movk/core` 提供了一套全面的、经过严格测试的 TypeScript 工具函数库，旨在简化您的日常开发工作。

#features
  :::u-page-feature
  ---
  icon: i-lucide-square-dashed
  ---
  #title
  80+ 实用工具

  #description
  涵盖数组、对象、字符串、异步操作、URL 处理、树形结构等多个领域，提供丰富、高效的函数，覆盖各种常见场景。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-square-function
  ---
  #title
  Vue 组合式函数

  #description
  提供 `useAppStorage`、`useCopyCode` 等即用型 Vue Composables，轻松为 Vue 项目集成响应式能力。
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
  完整类型定义

  #description
  全面使用 TypeScript 编写，提供完整的类型定义和卓越的类型推断，确保开发体验和代码质量。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-package-check
  ---
  #title
  支持 Tree-Shaking

  #description
  精心设计的模块化结构，支持 Tree-Shaking 优化，仅打包您需要的代码，减小生产环境的包体积。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-code-2
  ---
  #title
  现代化构建

  #description
  原生支持 ES Modules，使用 Unbuild 构建，无缝融入现代前端工程化体系，适用于 Vite、Nuxt 等环境。
  :::
::
