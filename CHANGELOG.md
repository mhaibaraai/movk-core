# 📋 Changelog

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
