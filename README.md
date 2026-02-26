[![Movk Core](https://core.mhaibaraai.cn/og-image.png)](https://core.mhaibaraai.cn/)

[![Install MCP in Cursor](https://core.mhaibaraai.cn/mcp/badge.svg)](https://core.mhaibaraai.cn/mcp/deeplink)
[![Install MCP in VS Code](https://core.mhaibaraai.cn/mcp/badge.svg?ide=vscode)](https://core.mhaibaraai.cn/mcp/deeplink?ide=vscode)

> `@movk/core` 是一个为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库，涵盖了数组、对象、字符串、异步操作等多个方面。

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![Movk Nuxt Docs][movk-nuxt-docs-src]][movk-nuxt-docs-href]

- 📖 [在线文档](https://core.mhaibaraai.cn)

## ✨ 特性

- **完整类型定义**：使用 TypeScript 构建，提供完整的类型定义和卓越的类型推断。
- **支持 Tree-Shaking**：精心设计的模块化结构，只打包你需要的代码，减小生产环境的包体积。
- **80+ 实用工具**：涵盖数组、对象、字符串、异步操作、URL 处理、树形结构等多个领域。
- **Vue 组合式函数**：提供 `useAppStorage`、`useCopyCode` 等即用型 Vue Composables。
- **现代化构建**：使用 Unbuild 构建，原生支持 ES Modules，无缝融入现代前端工程化体系。

## 🚀 快速开始

```bash
# pnpm
pnpm add @movk/core

# yarn
yarn add @movk/core

# npm
npm install @movk/core
```

## 📖 模块概览

`@movk/core` 提供以下模块：

### Composables

Vue 组合式函数，用于状态管理、剪贴板操作等常见场景。

### Validators

类型检查和验证工具，包括 `isObject`、`isArray`、`isString` 等。

### Utilities

通用工具函数，包括 UUID 生成、哈希计算等。

### Transformers

数据转换工具，包括：

- **String**：字符串格式转换（camelCase、kebabCase、snakeCase 等）
- **Object**：对象操作（pick、omit、deepClone、路径访问等）
- **Tree**：树形数据结构操作（遍历、查找、转换等）

### Helpers

专用辅助函数，包括：

- **Array**：数组操作（unique、chunk、flatten）
- **Async**：异步控制（throttle、debounce、sleep）
- **File**：文件处理（格式化大小、触发下载等）

## 📁 目录结构

```text
src/
├── composables/          # Vue 组合式函数
│   ├── useAppStorage     # 应用存储管理
│   └── useCopyCode       # 剪贴板复制
├── validators/           # 类型验证工具
│   ├── isObject          # 对象检查
│   ├── isArray           # 数组检查
│   ├── isString          # 字符串检查
│   └── ...               # 其他验证器
├── utilities/            # 通用工具函数
│   ├── array/            # 数组工具
│   ├── async/            # 异步工具
│   └── url/              # URL 工具
├── transformers/         # 数据转换工具
│   ├── string/           # 字符串转换
│   ├── object/           # 对象转换
│   └── tree/             # 树形结构操作
│       ├── fromList      # 扁平转树形
│       ├── toList        # 树形转扁平
│       ├── find          # 节点查找
│       ├── filter        # 节点过滤
│       ├── transform     # 节点转换
│       └── ...           # 其他树操作
└── helpers/              # 辅助函数
    ├── file/             # 文件处理
    ├── object/           # 对象操作
    └── path/             # 路径处理
```

## ⚡ 技术栈

- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Vitest](https://vitest.dev/) - 测试框架
- [Unbuild](https://github.com/unjs/unbuild) - 构建工具
- [pnpm](https://pnpm.io/) - 包管理器

## 📄 许可证

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
