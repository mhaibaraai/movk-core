[![Movk Core Docs](https://core.mhaibaraai.cn/og-image.png)](https://core.mhaibaraai.cn/)

[简体中文](./README.md) | English

[![Install MCP in Cursor](https://core.mhaibaraai.cn/mcp/badge.svg)](https://core.mhaibaraai.cn/mcp/deeplink)
[![Install MCP in VS Code](https://core.mhaibaraai.cn/mcp/badge.svg?ide=vscode)](https://core.mhaibaraai.cn/mcp/deeplink?ide=vscode)

> `@movk/core` is a modern, tree-shakable utility library for TypeScript projects, covering arrays, objects, strings, async operations, and more.

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![Movk Nuxt Docs][movk-nuxt-docs-src]][movk-nuxt-docs-href]

- 📖 [Online Docs](https://core.mhaibaraai.cn/en)

## ✨ Features

- **Full Type Definitions**: Built with TypeScript, providing complete type definitions and excellent type inference.
- **Tree-Shakable**: Carefully designed modular structure — only bundle what you need, reducing production bundle size.
- **80+ Utilities**: Covers arrays, objects, strings, async operations, URL handling, tree structures, and more.
- **Vue Composables**: Ready-to-use Vue composables like `useAppStorage` and `useCopyCode`.
- **Modern Build**: Built with Unbuild, native ES Modules support, seamlessly integrates with modern frontend tooling.

## 🚀 Quick Start

```bash
# pnpm
pnpm add @movk/core

# yarn
yarn add @movk/core

# npm
npm install @movk/core
```

## 📖 Module Overview

`@movk/core` provides the following modules:

### Composables

Vue composables for state management, clipboard operations, and other common scenarios.

### Validators

Type checking and validation utilities, including `isObject`, `isArray`, `isString`, and more.

### Utilities

General-purpose utilities, including UUID generation, hash computation, and more.

### Transformers

Data transformation tools, including:

- **String**: String format conversions (camelCase, kebabCase, snakeCase, etc.)
- **Object**: Object operations (pick, omit, deepClone, path access, etc.)
- **Tree**: Tree data structure operations (traversal, search, transform, etc.)

### Helpers

Specialized helper functions, including:

- **Array**: Array operations (unique, chunk, flatten)
- **Async**: Async control (throttle, debounce, sleep)
- **File**: File handling (format size, trigger download, etc.)

## 📁 Directory Structure

```text
src/
├── composables/          # Vue composables
│   ├── useAppStorage     # App storage management
│   └── useCopyCode       # Clipboard copy
├── validators/           # Type validation utilities
│   ├── isObject          # Object check
│   ├── isArray           # Array check
│   ├── isString          # String check
│   └── ...               # Other validators
├── utilities/            # General utilities
│   ├── array/            # Array utilities
│   ├── async/            # Async utilities
│   └── url/              # URL utilities
├── transformers/         # Data transformation tools
│   ├── string/           # String transformers
│   ├── object/           # Object transformers
│   └── tree/             # Tree structure operations
│       ├── fromList      # Flat list to tree
│       ├── toList        # Tree to flat list
│       ├── find          # Node search
│       ├── filter        # Node filter
│       ├── transform     # Node transform
│       └── ...           # Other tree operations
└── helpers/              # Helper functions
    ├── file/             # File handling
    ├── object/           # Object helpers
    └── path/             # Path helpers
```

## ⚡ Tech Stack

- [TypeScript](https://www.typescriptlang.org/) - JavaScript superset
- [Vitest](https://vitest.dev/) - Testing framework
- [Unbuild](https://github.com/unjs/unbuild) - Build tool
- [pnpm](https://pnpm.io/) - Package manager

## 📄 License

[MIT](./LICENSE) License © 2024-PRESENT [YiXuan](https://github.com/mhaibaraai)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@movk/core?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@movk/core

[npm-downloads-src]: https://img.shields.io/npm/dm/@movk/core?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@movk/core

[bundle-src]: https://img.shields.io/bundlephobia/minzip/@movk/core?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@movk/core

[license-src]: https://img.shields.io/github/license/mhaibaraai/movk-core.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/mhaibaraai/movk-core/blob/main/LICENSE.md

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@movk/core

[movk-nuxt-docs-src]: https://img.shields.io/npm/v/@movk/nuxt-docs?label=Movk%20Nuxt%20Docs&color=00DC82
[movk-nuxt-docs-href]: https://docs.mhaibaraai.cn
