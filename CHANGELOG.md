# 📋 Changelog

## [1.2.1](https://github.com/mhaibaraai/movk-core/compare/v1.2.0...v1.2.1) (2026-03-10)

### ✨ Features

* **types:** 新增 IsAny、WidenLiteral、Prettify、KnownKeys 类型工具 ([43c37b2](https://github.com/mhaibaraai/movk-core/commit/43c37b22a1e4f3495fe4daebc1d90fbf3612dab0)), closes [#69](https://github.com/mhaibaraai/movk-core/issues/69)

### 📝 Documentation

* **types:** 格式化类型文档代码示例对齐与导入顺序 ([99ffb2b](https://github.com/mhaibaraai/movk-core/commit/99ffb2b5592d9d3cf6cf095e8d8e3b248f138489))

### ♻️ Code Refactoring

* 代码现代化改进与依赖迁移 ([ab46324](https://github.com/mhaibaraai/movk-core/commit/ab46324fdcc45009acecd70ae51c64c2f849625e))
* 重构 vue.ts 组件类型提取工具，增强泛型 SFC 支持 ([9b2e244](https://github.com/mhaibaraai/movk-core/commit/9b2e24424a64733ebe89a65cb75a876df9d88953))

### 🔧 Chores

* **deps:** update all non-major dependencies ([4f82ddc](https://github.com/mhaibaraai/movk-core/commit/4f82ddcb83ff56ab2b02b12d8bba51a9a54d098e))
* **deps:** update dependency @nuxt/ui to ^4.5.1 ([03cb74d](https://github.com/mhaibaraai/movk-core/commit/03cb74dc6cf3cdf667f2f30ff8a58fff48f4db2d))
* 更新文档依赖及 AI 模型配置 ([788b24b](https://github.com/mhaibaraai/movk-core/commit/788b24b92101112bd64c468a27b52706417f5659))

## [1.2.0](https://github.com/mhaibaraai/movk-core/compare/v1.1.0...v1.2.0) (2026-03-02)

### ✨ Features

* 新增 deepMerge 深度合并工具函数 ([a9ffedc](https://github.com/mhaibaraai/movk-core/commit/a9ffedc0926f5fe4f389700f710f1d1507f4e62c))
* **docs:** 增强文档站点配置和功能 ([647f9c5](https://github.com/mhaibaraai/movk-core/commit/647f9c5cd1fffdd3837de85c18d436deb02f5e3d))
* **docs:** 添加 MCP 工具包集成和 AI 文档 ([0285704](https://github.com/mhaibaraai/movk-core/commit/0285704eb1ae34c341c5cb5c9f7aa13e26526bf5))

### 📝 Documentation

* 添加 MCP 安装徽章和项目指南 ([8438df8](https://github.com/mhaibaraai/movk-core/commit/8438df86eb33d722f9c214343c397e3582ff9593))

## [1.1.0](https://github.com/mhaibaraai/movk-core/compare/v1.0.3...v1.1.0) (2025-12-31)

### ⚠ BREAKING CHANGES

* 模块导入路径已更改

- 移除旧的 utils 目录(array、async、file、object、string、tree、validator、utilities)
- 新增 helpers 模块:提供辅助工具函数
- 新增 transformers 模块:负责数据转换(字符串大小写、树结构等)
- 新增 validators 模块:类型检查和数据验证
- 新增 utilities 模块:通用工具函数
- 重构 types 模块:更细粒度的类型组织(object、url 等)
- 更新所有相关测试文件和文档
- 更新 useAppStorage composable 以适配新模块

### ✨ Features

* **docs:** 扩展文档布局以支持新的模块化路径结构 ([131f8b5](https://github.com/mhaibaraai/movk-core/commit/131f8b5744a019ffbc5fefb4bb056cf29ec92a85))
* **docs:** 添加文档布局组件及导航搜索功能 ([a28a4d3](https://github.com/mhaibaraai/movk-core/commit/a28a4d37feced7192fe8c0097316a90839f20077))
* 添加 ParsedUrl 类型定义 ([4e1daf0](https://github.com/mhaibaraai/movk-core/commit/4e1daf0243177fd468bbb6a417f0017afee03eeb))

### 🐛 Bug Fixes

* 修复 release-it 测试命令配置 ([c0e29dc](https://github.com/mhaibaraai/movk-core/commit/c0e29dcc36bcffa714d6ea5ff60e0e3d09050047))
* 增强工具函数的空值安全检查 ([9e6ed06](https://github.com/mhaibaraai/movk-core/commit/9e6ed061f90cb26e8efeaced913fe6d8aac9b5b7))

### 📝 Documentation

* 优化项目文档和模块介绍 ([47e4d77](https://github.com/mhaibaraai/movk-core/commit/47e4d770306e6d8d943628f3498a8d4b691d2faf))
* 修正树工具函数文档的组件嵌套语法 ([e0abf30](https://github.com/mhaibaraai/movk-core/commit/e0abf30f603ebc13d8c790662563581ecfd7166f))
* 删除旧的 utils 和 validator 文档结构 ([668d8a5](https://github.com/mhaibaraai/movk-core/commit/668d8a5d5102be8149b40b6c953ac7c5a67341bc))
* 添加新的模块化文档结构 ([dec4a1f](https://github.com/mhaibaraai/movk-core/commit/dec4a1f7bfb3db3616ad67d8adbb6c7ab2898d06))
* 移除旧的工具函数和类型文档 ([4a13b1a](https://github.com/mhaibaraai/movk-core/commit/4a13b1ad7274e399b61db6336ac4e97aae087aa3))

### 💄 Styles

* 移除 CI 工作流配置中的尾随空白 ([073f65f](https://github.com/mhaibaraai/movk-core/commit/073f65f67d6bb82b1b4687689a1792828ae68f30))

### ♻️ Code Refactoring

* **docs:** 优化配置并迁移发布页面格式 ([f291687](https://github.com/mhaibaraai/movk-core/commit/f291687325302626464de38d8f2afc28edc429d3))
* 统一源码文件命名为 camelCase ([b6146b0](https://github.com/mhaibaraai/movk-core/commit/b6146b01e4f31a120144a836a0ea053911baa3f7))
* 重构模块架构,拆分 utils 为专业化模块 ([7c832ff](https://github.com/mhaibaraai/movk-core/commit/7c832ff43817fba5409355a5c09713d19b389cbe))

### ✅ Tests

* 更新测试以适配文件重命名 ([7248f60](https://github.com/mhaibaraai/movk-core/commit/7248f60149cf99bbb2c624480755aa9eab642996))

### 👷 CI

* 在工作流中添加类型检查步骤 ([03d9cf7](https://github.com/mhaibaraai/movk-core/commit/03d9cf72ef9d95ecbd8b751db090933a5c96240a))

### 🔧 Chores

* **deps:** update devdependency release-it to ^19.2.2 ([7c61cbd](https://github.com/mhaibaraai/movk-core/commit/7c61cbd7f4c88bcf2926290bcf8a3e97bf7ab629))
* **deps:** 升级文档依赖并迁移至 Zod v4 ([4218b5a](https://github.com/mhaibaraai/movk-core/commit/4218b5ae293b24f87d92e9bfbbad52fee008cbb1))
* **docs:** 升级 TypeScript 配置以支持 Nuxt 4 项目引用 ([a0cd6f3](https://github.com/mhaibaraai/movk-core/commit/a0cd6f33708db3dc3df20fa9e5203131ab707834))
* 优化构建脚本和依赖管理 ([c010cdf](https://github.com/mhaibaraai/movk-core/commit/c010cdf24a5bf7151169b4295a6dcdd6a13550bc))
* 更新项目配置并移除 zod 依赖 ([4fc60f4](https://github.com/mhaibaraai/movk-core/commit/4fc60f46d0f59de71b8c8d55d9bd42bfe18a8722))
* 清理依赖更新记录，移除重复项 ([39964a5](https://github.com/mhaibaraai/movk-core/commit/39964a5fea9abfea062bb42f9afbe5b87751aeb1))

## [1.0.3](https://github.com/mhaibaraai/movk-core/compare/v1.0.2...v1.0.3) (2025-12-25)

### ✨ Features

* **docs:** 迁移到 @movk/nuxt-docs 内置的 Vercel Analytics 支持 ([950934e](https://github.com/mhaibaraai/movk-core/commit/950934e1af50670acf29deb84881f94476a60ae3))

### 🐛 Bug Fixes

* **docs:** 修复移动端 UFieldGroup 宽度溢出问题 ([a4a73ee](https://github.com/mhaibaraai/movk-core/commit/a4a73ee7d1feecdce6c8d13692d40844cb69391f))
* 修正 pnpm 工作区配置位置 ([de08cb5](https://github.com/mhaibaraai/movk-core/commit/de08cb5b50e7f11e64afa9a8bd9ad478ed6a4057))

### 📝 Documentation

* 修正 Tree 工具函数参数说明 ([23106d7](https://github.com/mhaibaraai/movk-core/commit/23106d73b36b0c138d48cbbdc11e1aee1b8b8b38))

### 💄 Styles

* **docs:** 统一 UI 组件属性尾随逗号格式 ([a4a9417](https://github.com/mhaibaraai/movk-core/commit/a4a941723120f6c5896e935546079e050607611d))

### ♻️ Code Refactoring

* **docs:** 优化文档页面组件和样式 ([97cde4d](https://github.com/mhaibaraai/movk-core/commit/97cde4def346241f7447f5e95ea83c6e4d94b233))
* 将清理脚本从 TypeScript 迁移至独立 CLI 工具 ([e1a04e9](https://github.com/mhaibaraai/movk-core/commit/e1a04e9d97357c7dc30a860f12314cd466691aa9))

### 🔧 Chores

* **deps:** update devdependency @antfu/ni to v28 ([21fbc5d](https://github.com/mhaibaraai/movk-core/commit/21fbc5dad20850158765c1aef324d462d081c41f))
* **deps:** update peerdependency vue to ^3.5.25 ([e3214a4](https://github.com/mhaibaraai/movk-core/commit/e3214a4510789c7a884d9af988431340f27ecd02))
* **deps:** 更新 release-it 和相关依赖 ([fa9e472](https://github.com/mhaibaraai/movk-core/commit/fa9e472926e7a7aba98bb55810eaf1b5ba36d8a5))
* **deps:** 更新所有非主要版本依赖 ([c1f1ab6](https://github.com/mhaibaraai/movk-core/commit/c1f1ab67310c2f85268f4a49d04fbbaeeff68a68))
* **docs:** 升级 nuxt-docs 依赖并移除 commit changelog 功能 ([a6016de](https://github.com/mhaibaraai/movk-core/commit/a6016de1f19b403aa5ad923595f8779f557bd543))
* **docs:** 更新 lockfile 以移除 @octokit/rest ([9978570](https://github.com/mhaibaraai/movk-core/commit/997857079d6c7c1578c0455d3cb7d7952a7cad9f))
* **docs:** 移除未使用的 @octokit/rest 依赖 ([c833a54](https://github.com/mhaibaraai/movk-core/commit/c833a541a2e62c3b34e99a322e596e1fc1423d82))
* 删除 pnpm-lock.yaml ([bc09ad8](https://github.com/mhaibaraai/movk-core/commit/bc09ad8299023963392f97c7e1e586e8d7534cca))
* 更新 renovate.json，禁用 peerDependencies 的包规则 ([cb11fb3](https://github.com/mhaibaraai/movk-core/commit/cb11fb32c814eae41fc520b70675f88c9c750052))
* 添加 pnpm 工作区必需配置项 ([fddacac](https://github.com/mhaibaraai/movk-core/commit/fddacac18bd45216c8b2c674ae8371e05d04546f))
* 添加 pnpm-lock.yaml ([24313b9](https://github.com/mhaibaraai/movk-core/commit/24313b99f4838956df057b2c89b2b3cc6c345add))
* 移除 npm publish 的 --access 参数 ([1753624](https://github.com/mhaibaraai/movk-core/commit/1753624f7b0f8a7a64c2f7cd456f132d41ef2d68))
* 配置 pnpm 信任策略例外列表 ([320b606](https://github.com/mhaibaraai/movk-core/commit/320b606f000a590585476cbc5adea25f6b32d89a))

## [1.0.2](https://github.com/mhaibaraai/movk-core/compare/v1.0.1...v1.0.2) (2025-11-25)

### ♻️ Code Refactoring

* **types:** 使用 NonNullable 简化类型定义 ([36554f1](https://github.com/mhaibaraai/movk-core/commit/36554f1f4c59406dd61092729e63d32a5dc1768e))

### 🔧 Chores

* **config:** 扩展 changelog 配置以显示所有提交类型 ([7a7a4ad](https://github.com/mhaibaraai/movk-core/commit/7a7a4ad68890d9dc715ba70b8f84aca921cb5edd))
* **deps:** lock file maintenance ([c824c59](https://github.com/mhaibaraai/movk-core/commit/c824c59bf59f67c0b6ca2415ae8740c01db20d68))
* **deps:** update all non-major dependencies ([a9cab0c](https://github.com/mhaibaraai/movk-core/commit/a9cab0c8510d695dbe1c0c5402a814c0a0b26bb6))
* **deps:** update dependency @movk/nuxt-docs to ^1.3.6 ([ae37805](https://github.com/mhaibaraai/movk-core/commit/ae37805d4df18f032c76b4646861b615df27b110))
* **deps:** update peerdependency vue to ^3.5.25 ([195add6](https://github.com/mhaibaraai/movk-core/commit/195add65ff24384dfae27d6c0afd65f9104b8ab7))
* **deps:** 升级 nuxt-docs 和图标库依赖 ([a3e9ce3](https://github.com/mhaibaraai/movk-core/commit/a3e9ce327aa7e5e17e2c85d8e5a4399d2f47cbc3))

## [1.0.1](https://github.com/mhaibaraai/movk-core/compare/v1.0.0...v1.0.1) (2025-11-24)

### Bug Fixes

* 增加测试超时时间至6000毫秒 ([9db8c56](https://github.com/mhaibaraai/movk-core/commit/9db8c565e4e8a26855a0d3cfd65a14ae606ac46a))

### Chores

* 移除 package.json 中的 postinstall 脚本 ([b9f8591](https://github.com/mhaibaraai/movk-core/commit/b9f85910de07619f0aded0fd9e1830f8ef66446b))

## [1.0.0](https://github.com/mhaibaraai/movk-core/compare/v0.0.5...v1.0.0) (2025-11-21)

### Features

* **docs:** 添加 object 工具函数文档 ([f64db0a](https://github.com/mhaibaraai/movk-core/commit/f64db0a70d0e3c49f438c92957ba855ddee4861b))
* **test:** 为核心utils模块添加单元测试 ([ac5db8a](https://github.com/mhaibaraai/movk-core/commit/ac5db8a0345af4d72fb81809c54720bbb5262076))
* 添加 rm 脚本 ([86da1eb](https://github.com/mhaibaraai/movk-core/commit/86da1ebcea3eb7956b8207373e1deb77df688109))
* 添加新的文档结构和组件 ([4f569cd](https://github.com/mhaibaraai/movk-core/commit/4f569cd3133707a1aca70fca275a324cf5d99e0f))
* 添加项目文档 ([72bf541](https://github.com/mhaibaraai/movk-core/commit/72bf5411924a7ca69e555b2cd2ee8bdb3f9e5741))

## [0.0.5](https://github.com/mhaibaraai/movk-core/compare/v0.0.4...v0.0.5) (2025-09-03)

### Features

* **types:** 统一同步/异步返回类型并补充文档注释 ([0358091](https://github.com/mhaibaraai/movk-core/commit/0358091e1b3723f9dfd971af38079146ff797cda))
* **utils:** 添加 `separateMany` 多分组分离并清理旧文件 ([764d352](https://github.com/mhaibaraai/movk-core/commit/764d3525a31d914f8443a009078d4c485e77b43a))

## [0.0.4](https://github.com/mhaibaraai/movk-core/compare/v0.0.3...v0.0.4) (2025-07-31)

### ⚠ BREAKING CHANGES

* **data-structures/tree:** Tree 所有方法的类型签名与部分行为发生不兼容变更，升级后需同步调整调用方类型定义与用法

### Code Refactoring

* **data-structures/tree:** 重构 Tree 类型系统与 API，统一泛型与本地类型定义，完善 JSDoc 注释 ([ac30c6f](https://github.com/mhaibaraai/movk-core/commit/ac30c6f87bae114de27bb892da185d4ee21800c3))

## 0.0.3 (2025-07-31)

### Features

* 初始化项目结构与核心功能 ([7a5687e](https://github.com/mhaibaraai/movk-core/commit/7a5687e7acd523f3c5582ad16b48dc13c1c18bb0))
