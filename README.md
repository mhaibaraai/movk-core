# @movk/core

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

现代化的 Vue.js 工具库和组合式函数集合，提供完整的 TypeScript 支持和类型安全。

## ✨ 特性

- 🔧 **丰富的工具函数** - 涵盖数组、对象、字符串、文件等各类操作
- 🎯 **Vue 组合式函数** - 开箱即用的 Vue 3 Composition API 工具
- 📊 **数据结构** - 高效的树形结构和其他数据结构实现
- 🎨 **框架预设** - Flex 布局和 OWL 模式的CSS框架预设
- 🛡️ **类型安全** - 完整的 TypeScript 支持和 Zod 验证
- ⚡ **现代化** - 基于最新的 ES 模块和构建工具
- 📦 **轻量级** - 按需导入，最小化打包体积

## 📦 安装

```bash
# npm
npm install @movk/core

# yarn
yarn add @movk/core

# pnpm
pnpm add @movk/core
```

## 🚀 快速开始

```ts
import { debounce, deepClone, TreeNode, useAppStorage } from '@movk/core'

// 使用应用存储
const { state, setItem } = useAppStorage({
  key: 'app-config',
  defaultValue: { theme: 'light' }
})

// 使用防抖函数
const debouncedSearch = debounce((query: string) => {
  // 搜索逻辑
}, 300)

// 深度克隆对象
const cloned = deepClone(originalObject)
```

## 📚 功能模块

### 🎯 Composables

Vue 3 组合式函数，提供响应式的状态管理和通用功能。

- **`useAppStorage`** - 应用存储管理，支持 localStorage 和 sessionStorage
- **`useCopyCode`** - 代码复制功能，支持多种格式和自定义处理

```ts
import { useAppStorage } from '@movk/core'

const { state, setItem, getItem, removeItem } = useAppStorage({
  key: 'user-preferences',
  defaultValue: { theme: 'light', language: 'zh-CN' }
})
```

### 🛠️ Utils

全面的工具函数库，覆盖常见的开发需求。

#### 🔄 异步工具 (Async)

- **`debounce`** - 防抖函数
- **`throttle`** - 节流函数
- **`sleep`** - 睡眠延迟函数

#### 📊 数组操作 (Array)

- **`operations`** - 数组操作工具集

#### 📄 对象处理 (Object)

- **`deepClone`** - 深度克隆
- **`pick`** - 选择对象属性
- **`omit`** - 排除对象属性
- **`separate`** - 对象分离
- **`convert`** - 对象转换

#### 🔤 字符串处理 (String)

- **`case`** - 大小写转换工具

#### 📁 文件操作 (File)

- **`download`** - 文件下载
- **`formatFileSize`** - 文件大小格式化
- **`convertSvgToPng`** - SVG 转 PNG
- **`replaceCurrentColor`** - 替换当前颜色

#### 🔍 验证器 (Validator)

基于 Zod 的类型验证工具

### 📊 数据结构 (Data Structures)

高效的数据结构实现，针对常见场景优化。

- **`TreeNode`** - 树形数据结构，支持遍历、搜索、修改等操作

```ts
import { TreeNode } from '@movk/core'

const tree = new TreeNode('root', 'Root Node')
tree.addChild(new TreeNode('child1', 'Child 1'))
```

### 🎨 框架预设 (Framework)

CSS 框架和布局预设，提供常用的样式模式。

- **`preset-flex`** - Flexbox 布局预设
- **`preset-owl`** - OWL (Object - Where - Layout) 模式预设

## 🔧 开发

### 环境要求

- Node.js 18+
- pnpm 9+

### 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 发布版本
pnpm release
```

### 项目结构

```tree
movk-core/
├── src/
│   ├── composables/          # Vue 组合式函数
│   ├── constants/            # 常量定义
│   ├── data-structures/      # 数据结构实现
│   ├── framework/            # 框架预设
│   ├── types/               # TypeScript 类型定义
│   └── utils/               # 工具函数
│       ├── array/           # 数组工具
│       ├── async/           # 异步工具
│       ├── file/            # 文件操作
│       ├── object/          # 对象处理
│       ├── string/          # 字符串处理
│       ├── utilities/       # 通用工具
│       └── validator/       # 验证器
├── tests/                   # 测试文件
└── scripts/                 # 构建脚本
```

## 📄 许可证

[MIT](./LICENSE) License © 2025 mhaibaraai

## 📞 支持

- [GitHub Issues](https://github.com/mhaibaraai/movk-core/issues)
- [文档](https://github.com/mhaibaraai/movk-core)

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
