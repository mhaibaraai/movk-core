---
seo:
  title: Modern TypeScript Utility Library
  description: A modern, tree-shakable TypeScript utility library for your projects. Covering arrays, objects, strings, async operations, and more — with complete type definitions and Vue composables.
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
  Modern [TypeScript]{.text-primary} Utility Library.
  :::

#description
  :::motion
  ---
  transition: { duration: 0.6, delay: 0.3 }
  ---
  A modern utility library for TypeScript projects, covering arrays, objects, strings, async operations, and more. Fully supports Tree-Shaking with complete type definitions and Vue composables.
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
    Get Started
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
Features

#description
`@movk/core` provides a comprehensive, rigorously tested TypeScript utility library designed to simplify your daily development work.

#features
  :::u-page-feature
  ---
  icon: i-lucide-square-dashed
  ---
  #title
  80+ Utilities

  #description
  Covering arrays, objects, strings, async operations, URL handling, tree structures, and more — a rich set of efficient functions for every common scenario.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-square-function
  ---
  #title
  Vue Composables

  #description
  Ready-to-use Vue Composables like `useAppStorage` and `useCopyCode` that seamlessly integrate reactive capabilities into your Vue project.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list-tree
  ---
  #title
  Powerful Tree Utilities

  #description
  Built-in efficient tree data structure tools for traversal, filtering, searching, and transformation with ease.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  ---
  #title
  Full Type Definitions

  #description
  Written entirely in TypeScript with complete type definitions and excellent type inference, ensuring a great developer experience and code quality.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-package-check
  ---
  #title
  Tree-Shaking Support

  #description
  Carefully designed modular structure with Tree-Shaking support — only the code you actually import gets bundled, keeping production builds lean.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-code-2
  ---
  #title
  Modern Build

  #description
  Native ES Module support, built with Unbuild, seamlessly integrating into modern frontend toolchains like Vite and Nuxt.
  :::
::
