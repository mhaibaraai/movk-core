[![Movk Core](https://core.mhaibaraai.cn/og-image.png)](https://core.mhaibaraai.cn/)

> `@movk/core` 是一个为 TypeScript 项目设计的现代化、支持 tree-shaking 的工具函数库，涵盖了数组、对象、字符串、异步操作等多个方面。

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![Movk Nuxt Docs][movk-nuxt-docs-src]][movk-nuxt-docs-href]

- 📖 [在线文档](https://core.mhaibaraai.cn)

## ✨ 特性

- **现代化**: 使用 TypeScript 构建，提供完整的类型定义。
- **Tree-Shaking**: 只打包你需要的代码，减小生产环境的包体积。
- **功能丰富**: 涵盖数组、对象、字符串、异步等多种工具函数。
- **组合式**: 提供 Vue Composables，方便在 Vue 项目中使用。
- **文档齐全**: 提供完善的文档和示例。

## 🚀 快速开始

```bash
# pnpm
pnpm add @movk/core

# yarn
yarn add @movk/core

# npm
npm install @movk/core
```

## 📖 API 参考

### Composables (组合式函数)

- `useAppStorage`: 用于管理 `localStorage` 或 `sessionStorage` 中应用程序数据的组合式函数。
- `useCopyCode`: 用于将文本复制到剪贴板的组合式函数。

### Utils (工具函数)

#### Array (数组)

- `unique`: 创建一个不含重复元素的数组副本。
- `chunk`: 将数组拆分成多个指定大小的块。
- `flatten`: 将嵌套数组展平到指定深度。

#### Async (异步)

- `throttle`: 创建一个节流函数，在指定时间间隔内最多只执行一次。
- `debounce`: 创建一个防抖函数，在指定延迟后执行，延迟时间会在每次调用时重置。
- `sleep`: 将执行暂停指定的毫秒数。
- `sleepWithCancel`: 可取消的 `sleep` 版本。

#### File (文件)

- `formatFileSize`: 将文件大小（字节）格式化为人类可读的字符串。
- `extractFilename`: 从 `Content-Disposition` 响应头中提取文件名。
- `triggerDownload`: 在浏览器中触发文件下载。

#### Object (对象)

- `isValidContainer`: 检查一个值是否为有效的容器（对象或数组）。
- `toPath`: 将路径字符串或数组转换为路径数组。
- `getPath`: 获取对象中指定路径的值。
- `setPath`: 设置对象中指定路径的值。
- `joinPath`: 将多个路径片段连接成一个路径字符串。
- `deepClone`: 创建一个值的深拷贝。
- `pick`: 从对象中挑选指定的属性，创建一个新对象。
- `separate`: 将对象根据指定的键分割成两个对象。
- `separateMany`: 根据多个键组将对象分割成多个对象。
- `convertToKebabCase`: 将对象的所有键转换为 kebab-case 格式。
- `omit`: `pick` 的反向操作；创建一个省略了指定属性的新对象。
- `omitUndefined`: 创建一个移除了所有 `undefined` 属性的新对象。

#### String (字符串)

- `startCase`: 将字符串转换为 [Start Case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage) 格式。
- `camelCase`: 将字符串转换为 [camelCase](https://en.wikipedia.org/wiki/Camel_case) 格式。
- `kebabCase`: 将字符串转换为 [kebab-case](https://en.wikipedia.org/wiki/Kebab_case) 格式。
- `snakeCase`: 将字符串转换为 [snake_case](https://en.wikipedia.org/wiki/Snake_case) 格式。
- `pascalCase`: 将字符串转换为 [PascalCase](https://en.wikipedia.org/wiki/Pascal_case) 格式。
- `capitalize`: 将字符串的第一个字符转换为大写，其余转换为小写。
- `upperFirst`: 将字符串的第一个字符转换为大写。
- `lowerFirst`: 将字符串的第一个字符转换为小写。
- `upperCase`: 将整个字符串转换为大写。
- `lowerCase`: 将整个字符串转换为小写。
- `words`: 将字符串拆分为一个单词数组。

#### Tree (树)

一个包含用于处理树状数据结构的静态方法的类。

- `fromList`: 将扁平的对象列表转换为树状结构。
- `toList`: 将树状结构转换为扁平的对象列表。
- `estimateSize`: 估算树中的节点总数。
- `find`: 查找树中满足条件的第一个节点。
- `findAll`: 查找树中所有满足条件的节点。
- `findById`: 按 ID 查找树中的节点。
- `getStats`: 获取关于树的统计信息（总节点数、叶子节点数、深度等）。
- `filter`: 过滤树，只保留满足条件的节点（及其祖先）。
- `transform`: 创建一个具有相同结构的新树，但每个节点都经过转换函数处理。
- `forEach`: 对树中的每个节点执行一次提供的函数。
- `insertBefore`: 在目标节点之前插入一个新节点。
- `insertAfter`: 在目标节点之后插入一个新节点。
- `remove`: 从树中移除一个节点。
- `validate`: 验证树结构的完整性。

#### Utilities (实用工具)

- `getRandomUUID`: 生成一个随机的 UUID。
- `simpleHash`: 从字符串创建一个简单的哈希值。

#### Validator (验证器)

- `isObject`: 检查值是否为对象。
- `isArray`: 检查值是否为数组。
- `isString`: 检查值是否为字符串。
- `isNumber`: 检查值是否为数字。
- `isFunction`: 检查值是否为函数。
- `isEmpty`: 检查值是否为空。
- `isPlainObject`: 检查值是否为纯粹的对象（plain object）。

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
