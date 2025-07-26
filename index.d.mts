import { VNode, Ref } from 'vue';
import { z } from 'zod/v4';

type AnyObject = Record<string, any>;
type OmitByKey<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};
type PickByKey<T, K extends keyof T> = {
    [P in keyof T as P extends K ? P : never]: T[P];
};
type RenameKeys<T, Mapping extends {
    [K in keyof T]?: PropertyKey;
}> = {
    [K in keyof T as K extends keyof Mapping ? Exclude<Mapping[K], undefined> : K]: T[K];
};
type RequiredByKeys<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ReadonlyByKeys<T, K extends keyof T> = T & {
    readonly [P in K]: T[P];
};
type MutableByKeys<T, K extends keyof T> = {
    -readonly [P in K]: T[P];
} & Omit<T, K>;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? {
    [K in keyof I]: I[K];
} : never;
type FirstParam<T, K extends keyof T> = T[K] extends [infer P, ...any[]] ? P : never;
type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : undefined;
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};
type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any> ? MaybeObject[Key] : never;
type StringOrVNode = string | VNode | (() => VNode);

declare const StorageTypeSchema: z.ZodEnum<{
    localStorage: "localStorage";
    sessionStorage: "sessionStorage";
}>;
type StorageType = z.infer<typeof StorageTypeSchema>;
declare function createStorageConfigSchema<T = unknown>(schema: z.ZodType<T>): z.ZodObject<{
    key: z.ZodString;
    schema: z.ZodCustom<z.ZodType<T, unknown, z.core.$ZodTypeInternals<T, unknown>>, z.ZodType<T, unknown, z.core.$ZodTypeInternals<T, unknown>>>;
    defaultValue: z.ZodCustom<T, T>;
    prefix: z.ZodDefault<z.ZodString>;
    storage: z.ZodDefault<z.ZodEnum<{
        localStorage: "localStorage";
        sessionStorage: "sessionStorage";
    }>>;
}, z.core.$strip>;
type StorageConfig<T = unknown> = z.infer<ReturnType<typeof createStorageConfigSchema<T>>>;
type StorageConfigInput<T = unknown> = z.input<ReturnType<typeof createStorageConfigSchema<T>>>;
interface AppStorageReturn<T> {
    state: Ref<T>;
    getItem: () => T;
    setItem: (value: T) => void;
    removeItem: () => void;
}

declare const _TreeNodeBaseSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
type TreeNodeBase = z.infer<typeof _TreeNodeBaseSchema>;
type TreeNode<T extends TreeNodeBase = TreeNodeBase> = T & {
    [K in TreeConfig['children']]: TreeNode<T>[];
};
declare const TreeConfigSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    pid: z.ZodDefault<z.ZodString>;
    children: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
type TreeConfig = z.infer<typeof TreeConfigSchema>;
type TreeConfigInput = z.input<typeof TreeConfigSchema>;
declare const TreeStatsSchema: z.ZodObject<{
    total: z.ZodNumber;
    leaves: z.ZodNumber;
    depth: z.ZodNumber;
    branches: z.ZodNumber;
}, z.core.$strip>;
type TreeStats = z.infer<typeof TreeStatsSchema>;
interface TreeNodeResult<T extends TreeNodeBase = TreeNodeBase> {
    readonly node: TreeNode<T>;
    readonly path: readonly TreeNode<T>[];
    readonly depth: number;
    readonly index: number;
}
type TreePredicate<T extends TreeNodeBase = TreeNodeBase> = (node: TreeNode<T>, depth: number, path: readonly TreeNode<T>[]) => boolean;
type TreeTransformer<T extends TreeNodeBase = TreeNodeBase, R extends TreeNodeBase = TreeNodeBase> = (node: TreeNode<T>, depth: number, path: readonly TreeNode<T>[]) => R;
type TreeVisitor<T extends TreeNodeBase = TreeNodeBase> = (node: TreeNode<T>, depth: number, path: readonly TreeNode<T>[]) => void | boolean;

/**
 * 应用存储管理的组合式函数，支持localStorage和sessionStorage
 *
 * @category Composables
 * @param config 存储配置对象
 * @returns 存储管理对象，包含响应式状态和操作方法
 * @example
 * ```ts
 * import { z } from 'zod/v4'
 *
 * // 定义用户偏好设置的schema
 * const userPrefsSchema = z.object({
 *   theme: z.enum(['light', 'dark']),
 *   language: z.string(),
 *   fontSize: z.number().min(12).max(24)
 * })
 *
 * // 创建存储管理实例
 * const { state, setItem, getItem, removeItem } = useAppStorage({
 *   key: 'user-preferences',
 *   defaultValue: {
 *     theme: 'light',
 *     language: 'zh-CN',
 *     fontSize: 16
 *   },
 *   schema: userPrefsSchema,
 *   storage: 'localStorage',
 *   prefix: 'app'
 * })
 *
 * // 使用响应式状态
 * console.log(state.value.theme) // 'light'
 *
 * // 更新设置
 * setItem({
 *   theme: 'dark',
 *   language: 'en-US',
 *   fontSize: 18
 * })
 * ```
 */
declare function useAppStorage<T = unknown>(config: StorageConfigInput<T>): AppStorageReturn<T>;

/**
 * 复制文本到剪贴板的组合式函数
 *
 * @category Composables
 * @param text 要复制的文本内容
 * @returns 复制是否成功的Promise
 * @example
 * ```ts
 * // 复制简单文本
 * const copyText = async () => {
 *   const success = await useCopyCode('Hello, World!')
 *   if (success) {
 *     console.log('复制成功')
 *   } else {
 *     console.log('复制失败')
 *   }
 * }
 *
 * // 复制代码块
 * const copyCodeBlock = async () => {
 *   const code = `
 *   function hello() {
 *     console.log('Hello, World!')
 *   }
 *   `
 *   const success = await useCopyCode(code)
 *   if (success) {
 *     // 显示复制成功提示
 *     showNotification('代码已复制到剪贴板')
 *   }
 * }
 *
 * // 在点击事件中使用
 * const handleCopy = () => {
 *   useCopyCode(document.getElementById('code').textContent)
 * }
 * ```
 */
declare function useCopyCode(text: string): Promise<boolean>;

/**
 * 树形数据结构操作类，提供树形数据的各种操作方法
 *
 * @category Data Structures
 * @example
 * ```ts
 * // 从扁平数组创建树形结构
 * const flatList = [
 *   { id: '1', name: '根节点', pid: null },
 *   { id: '2', name: '子节点1', pid: '1' },
 *   { id: '3', name: '子节点2', pid: '1' },
 *   { id: '4', name: '孙节点', pid: '2' }
 * ]
 *
 * const tree = Tree.fromList(flatList)
 * console.log(tree) // 树形结构
 *
 * // 查找节点
 * const found = Tree.find(tree, (node) => node.name === '子节点1')
 *
 * // 过滤节点
 * const filtered = Tree.filter(tree, (node) => node.name.includes('子'))
 *
 * // 转换树形结构
 * const transformed = Tree.transform(tree, (node) => ({
 *   ...node,
 *   displayName: `[${node.name}]`
 * }))
 * ```
 */
declare class Tree {
    private static dfsGenerator;
    private static bfsGenerator;
    private static selectStrategy;
    /**
     * 从扁平数组创建树形结构
     *
     * @category Data Structures
     * @param list 扁平数组数据
     * @param config 树形配置选项
     * @returns 树形结构数组
     * @example
     * ```ts
     * const flatData = [
     *   { id: '1', name: '部门1', parentId: null },
     *   { id: '2', name: '部门1-1', parentId: '1' },
     *   { id: '3', name: '部门1-2', parentId: '1' },
     *   { id: '4', name: '部门1-1-1', parentId: '2' }
     * ]
     *
     * const tree = Tree.fromList(flatData, {
     *   id: 'id',
     *   pid: 'parentId',
     *   children: 'children'
     * })
     *
     * console.log(tree) // 转换为树形结构
     * ```
     */
    static fromList<T extends TreeNodeBase>(list: T[], config?: TreeConfigInput): TreeNode<T>[];
    /**
     * 将树形结构转换为扁平数组
     *
     * @category Data Structures
     * @param tree 树形结构（单个节点或节点数组）
     * @param config 树形配置选项
     * @returns 扁平数组
     * @example
     * ```ts
     * const tree = [
     *   {
     *     id: '1',
     *     name: '根节点',
     *     children: [
     *       { id: '2', name: '子节点1', children: [] },
     *       { id: '3', name: '子节点2', children: [] }
     *     ]
     *   }
     * ]
     *
     * const flatList = Tree.toList(tree)
     * console.log(flatList) // [{ id: '1', name: '根节点' }, { id: '2', name: '子节点1' }, ...]
     * ```
     */
    static toList<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], config?: TreeConfigInput): T[];
    static estimateSize<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], config?: TreeConfigInput): number;
    static find<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], predicate: TreePredicate<T>, config?: TreeConfigInput): TreeNodeResult<T> | undefined;
    static findAll<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], predicate: TreePredicate<T>, config?: TreeConfigInput): TreeNodeResult<T>[];
    static findById<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], id: string, config?: TreeConfigInput): TreeNodeResult<T> | undefined;
    static getStats<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], config?: TreeConfigInput): TreeStats;
    static filter<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], predicate: TreePredicate<T>, config?: TreeConfigInput): TreeNode<T>[];
    static transform<T extends TreeNodeBase, R extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], transformer: TreeTransformer<T, R>, config?: TreeConfigInput): TreeNode<R>[];
    static forEach<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], visitor: TreeVisitor<T>, config?: TreeConfigInput): void;
    static insertBefore<T extends TreeNodeBase>(tree: TreeNode<T>[], targetId: string, newNode: T, config?: TreeConfigInput): boolean;
    static insertAfter<T extends TreeNodeBase>(tree: TreeNode<T>[], targetId: string, newNode: T, config?: TreeConfigInput): boolean;
    static remove<T extends TreeNodeBase>(tree: TreeNode<T>[], targetId: string, config?: TreeConfigInput): TreeNode<T> | undefined;
    static validate<T extends TreeNodeBase>(tree: TreeNode<T> | TreeNode<T>[], config?: TreeConfigInput): {
        isValid: boolean;
        errors: string[];
    };
}

/**
 * UnoCSS Flex布局预设，提供便捷的flex布局工具类
 *
 * @category Framework
 * @returns UnoCSS预设配置对象
 * @example
 * ```ts
 * // 在unocss.config.ts中使用
 * import { presetFlex } from '@movk/core'
 *
 * export default defineConfig({
 *   presets: [
 *     presetFlex(),
 *     // 其他预设...
 *   ]
 * })
 *
 * // 在HTML中使用生成的类名
 * <div class="flex-row-center-center">居中的flex容器</div>
 * <div class="flex-col-between-start">纵向分散对齐</div>
 * <div class="flex-center">完全居中</div>
 * <div class="flex-x-center">水平居中</div>
 * <div class="flex-y-center">垂直居中</div>
 * ```
 */
declare function presetFlex(): {
    name: string;
    rules: ((RegExp | (([, d, j, a]: string[], { rawSelector }: {
        rawSelector: string;
    }) => Record<string, string>) | {
        autocomplete: string;
    })[] | (string | {
        display: string;
        'justify-content': string;
        'align-items': string;
    })[])[];
    shortcuts: {
        'flex-x-center': string;
        'flex-y-center': string;
        'inline-flex-x-center': string;
        'inline-flex-y-center': string;
    }[];
};

interface RuleContext {
    rawSelector: string;
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
declare function presetOwl(): {
    name: string;
    rules: (RegExp | (([, value]: string[], { rawSelector }: RuleContext) => string | undefined) | {
        autocomplete: string;
    })[][];
    shortcuts: {
        'owl-stack': string;
        'owl-stack-tight': string;
        'owl-stack-loose': string;
        'owl-list': string;
        'owl-list-tight': string;
        'owl-nav': string;
        'owl-card-stack': string;
    }[];
};

/**
 * 数组去重，返回去除重复元素后的新数组
 *
 * @category Array
 * @param arr 待去重的数组
 * @returns 去重后的新数组
 * @example
 * ```ts
 * const numbers = [1, 2, 2, 3, 3, 4]
 * const uniqueNumbers = unique(numbers)
 * console.log(uniqueNumbers) // [1, 2, 3, 4]
 *
 * const strings = ['a', 'b', 'a', 'c']
 * const uniqueStrings = unique(strings)
 * console.log(uniqueStrings) // ['a', 'b', 'c']
 * ```
 */
declare function unique<T>(arr: T[]): T[];
/**
 * 将数组分割成指定大小的块
 *
 * @category Array
 * @param arr 待分割的数组
 * @param size 每个块的大小
 * @returns 分割后的二维数组
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const chunks = chunk(numbers, 3)
 * console.log(chunks) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
 * const pairs = chunk(names, 2)
 * console.log(pairs) // [['Alice', 'Bob'], ['Charlie', 'David'], ['Eve']]
 * ```
 */
declare function chunk<T>(arr: T[], size: number): T[][];
/**
 * 数组扁平化，将嵌套数组展平到指定深度
 *
 * @category Array
 * @param arr 待扁平化的数组
 * @param depth 扁平化深度，默认为1
 * @returns 扁平化后的数组
 * @example
 * ```ts
 * const nested = [1, [2, 3], [4, [5, 6]]]
 * const flat1 = flatten(nested)
 * console.log(flat1) // [1, 2, 3, 4, [5, 6]]
 *
 * const flat2 = flatten(nested, 2)
 * console.log(flat2) // [1, 2, 3, 4, 5, 6]
 * ```
 */
declare function flatten<T>(arr: T[], depth?: number): any[];

/**
 * 防抖函数，在指定时间内多次触发只执行最后一次
 *
 * @category Async
 * @param func 需要防抖的函数
 * @param wait 防抖延迟时间（毫秒）
 * @returns 防抖处理后的函数
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('搜索:', query)
 * }, 300)
 *
 * // 连续调用，只有最后一次会执行
 * debouncedSearch('a')
 * debouncedSearch('ab')
 * debouncedSearch('abc') // 只有这次会在300ms后执行
 * ```
 */
declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;

/**
 * 延迟执行函数，返回一个在指定时间后resolve的Promise
 *
 * @category Async
 * @param ms 延迟时间（毫秒）
 * @returns 延迟Promise
 * @example
 * ```ts
 * // 延迟1秒后继续执行
 * await sleep(1000)
 * console.log('1秒后执行')
 *
 * // 在异步函数中使用
 * async function delayedOperation() {
 *   console.log('开始')
 *   await sleep(500)
 *   console.log('500ms后执行')
 * }
 * ```
 */
declare function sleep(ms: number): Promise<void>;
/**
 * 可取消的延迟函数，返回Promise和取消函数
 *
 * @category Async
 * @param ms 延迟时间（毫秒）
 * @returns 包含Promise和取消函数的对象
 * @example
 * ```ts
 * const { promise, cancel } = sleepWithCancel(5000)
 *
 * // 在另一个地方取消延迟
 * setTimeout(() => {
 *   cancel() // 取消延迟
 * }, 2000)
 *
 * try {
 *   await promise
 *   console.log('5秒后执行')
 * } catch (error) {
 *   console.log('延迟被取消')
 * }
 * ```
 */
declare function sleepWithCancel(ms: number): {
    promise: Promise<void>;
    cancel: () => void;
};

/**
 * 节流函数，在指定时间内多次触发只执行第一次
 *
 * @category Async
 * @param func 需要节流的函数
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流处理后的函数
 * @example
 * ```ts
 * const throttledScroll = throttle((event: Event) => {
 *   console.log('滚动事件处理')
 * }, 100)
 *
 * // 监听滚动事件，每100ms最多执行一次
 * window.addEventListener('scroll', throttledScroll)
 * ```
 */
declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;

/**
 * 将SVG字符串转换为PNG格式的Blob对象
 *
 * @category File
 * @param svg SVG字符串
 * @returns PNG格式的Blob对象
 * @throws 当SVG无效或转换失败时抛出错误
 * @example
 * ```ts
 * const svgString = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'
 *
 * try {
 *   const pngBlob = await convertSvgToPng(svgString)
 *   const url = URL.createObjectURL(pngBlob)
 *
 *   // 用于下载或显示
 *   const img = document.createElement('img')
 *   img.src = url
 *   document.body.appendChild(img)
 * } catch (error) {
 *   console.error('SVG转换失败:', error)
 * }
 * ```
 */
declare function convertSvgToPng(svg: string): Promise<Blob>;

/**
 * 从响应头中提取文件名
 *
 * @category File
 * @param headers 响应头对象
 * @param fallbackName 默认文件名
 * @returns 提取的文件名
 * @example
 * ```ts
 * // 从响应头中提取文件名
 * const headers = new Headers({
 *   'content-disposition': 'attachment; filename="report.pdf"'
 * })
 * const filename = extractFilename(headers, 'download')
 * console.log(filename) // 'report.pdf'
 *
 * // 处理编码的文件名
 * const encodedHeaders = new Headers({
 *   'content-disposition': 'attachment; filename*=UTF-8\'\'%E6%8A%A5%E5%91%8A.pdf'
 * })
 * const encodedFilename = extractFilename(encodedHeaders)
 * console.log(encodedFilename) // '报告.pdf'
 * ```
 */
declare function extractFilename(headers?: Headers, fallbackName?: string): string;
/**
 * 触发浏览器下载文件
 *
 * @category File
 * @param blob 文件数据
 * @param filename 文件名
 * @example
 * ```ts
 * // 下载文本文件
 * const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
 * triggerDownload(textBlob, 'hello.txt')
 *
 * // 下载JSON数据
 * const data = { name: 'John', age: 30 }
 * const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
 * triggerDownload(jsonBlob, 'data.json')
 *
 * // 下载图片
 * const canvas = document.createElement('canvas')
 * canvas.toBlob((blob) => {
 *   if (blob) {
 *     triggerDownload(blob, 'image.png')
 *   }
 * })
 * ```
 */
declare function triggerDownload(blob: Blob, filename: string): void;

/**
 * 格式化文件大小，将字节数转换为可读的文件大小字符串
 *
 * @category File
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 * @example
 * ```ts
 * console.log(formatFileSize(1024)) // '1 KB'
 * console.log(formatFileSize(1536)) // '1.5 KB'
 * console.log(formatFileSize(1048576)) // '1 MB'
 * console.log(formatFileSize(1073741824)) // '1 GB'
 *
 * // 处理边界情况
 * console.log(formatFileSize(0)) // '0 Bytes'
 * console.log(formatFileSize(-100)) // '0 Bytes'
 * ```
 */
declare function formatFileSize(bytes: number): string;

/**
 * 替换SVG文件中的currentColor为指定颜色
 *
 * @category File
 * @param path SVG文件路径
 * @param color 替换的颜色值，不提供则返回原始SVG
 * @returns 处理后的SVG字符串
 * @throws 当文件获取失败或SVG无效时抛出错误
 * @example
 * ```ts
 * // 获取并替换SVG中的currentColor
 * try {
 *   const svgContent = await replaceCurrentColor('/icons/star.svg', '#ff0000')
 *   const container = document.createElement('div')
 *   container.innerHTML = svgContent
 *   document.body.appendChild(container)
 * } catch (error) {
 *   console.error('SVG处理失败:', error)
 * }
 *
 * // 只获取SVG内容，不替换颜色
 * const originalSvg = await replaceCurrentColor('/icons/star.svg')
 * ```
 */
declare function replaceCurrentColor(path: string, color?: string): Promise<string>;

/**
 * 将对象的键名转换为kebab-case格式
 *
 * @category Object
 * @param obj 待转换的对象
 * @param deep 是否深度转换嵌套对象，默认为false
 * @returns 转换后的对象
 * @example
 * ```ts
 * const obj = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   userInfo: {
 *     birthDate: '1990-01-01',
 *     phoneNumber: '123-456-7890'
 *   }
 * }
 *
 * const converted = convertToKebabCase(obj)
 * console.log(converted)
 * // {
 * //   'first-name': 'John',
 * //   'last-name': 'Doe',
 * //   'user-info': { birthDate: '1990-01-01', phoneNumber: '123-456-7890' }
 * // }
 *
 * const deepConverted = convertToKebabCase(obj, true)
 * console.log(deepConverted)
 * // {
 * //   'first-name': 'John',
 * //   'last-name': 'Doe',
 * //   'user-info': { 'birth-date': '1990-01-01', 'phone-number': '123-456-7890' }
 * // }
 * ```
 */
declare function convertToKebabCase<T extends AnyObject>(obj: T, deep?: boolean): T;

/**
 * 深度克隆对象，创建完全独立的副本
 *
 * @category Object
 * @param obj 待克隆的对象
 * @returns 深度克隆后的对象
 * @example
 * ```ts
 * const original = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     city: 'New York',
 *     zip: '10001'
 *   },
 *   hobbies: ['reading', 'coding']
 * }
 *
 * const cloned = deepClone(original)
 * cloned.address.city = 'Los Angeles'
 * cloned.hobbies.push('gaming')
 *
 * console.log(original.address.city) // 'New York' (未改变)
 * console.log(original.hobbies.length) // 2 (未改变)
 * console.log(cloned.address.city) // 'Los Angeles'
 * console.log(cloned.hobbies.length) // 3
 * ```
 */
declare function deepClone<T>(obj: T): T;

/**
 * 从对象中排除指定的键，返回新对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要排除的键数组
 * @returns 排除指定键后的新对象
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   password: 'secret',
 *   email: 'john@example.com'
 * }
 *
 * const publicUser = omit(user, ['password'])
 * console.log(publicUser) // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * const basicInfo = omit(user, ['password', 'email'])
 * console.log(basicInfo) // { id: 1, name: 'John' }
 * ```
 */
declare function omit<T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): OmitByKey<T, K>;
/**
 * 从对象中排除值为undefined的键
 *
 * @category Object
 * @param obj 源对象
 * @returns 排除undefined值后的新对象
 * @example
 * ```ts
 * const data = {
 *   name: 'John',
 *   age: undefined,
 *   city: 'New York',
 *   country: undefined
 * }
 *
 * const cleaned = omitUndefined(data)
 * console.log(cleaned) // { name: 'John', city: 'New York' }
 *
 * // 用于API请求前清理数据
 * const requestData = omitUndefined({
 *   title: 'Post Title',
 *   content: 'Post content',
 *   tags: undefined,
 *   published: true
 * })
 * ```
 */
declare function omitUndefined<T extends AnyObject>(obj: T): Partial<T>;

/**
 * 从对象中选择指定的键，返回新对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要选择的键数组
 * @returns 只包含指定键的新对象
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret',
 *   createdAt: '2023-01-01',
 *   updatedAt: '2023-01-15'
 * }
 *
 * const publicInfo = pick(user, ['id', 'name', 'email'])
 * console.log(publicInfo) // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * const basicInfo = pick(user, ['id', 'name'])
 * console.log(basicInfo) // { id: 1, name: 'John' }
 * ```
 */
declare function pick<T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): PickByKey<T, K>;

interface SeparateResult<T extends AnyObject, K extends keyof T> {
    picked: PickByKey<T, K>;
    omitted: OmitByKey<T, K>;
}
/**
 * 将对象按指定键分离为两个对象
 *
 * @category Object
 * @param obj 源对象
 * @param keys 要分离的键数组
 * @returns 包含picked和omitted两个对象的结果
 * @example
 * ```ts
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret',
 *   role: 'admin'
 * }
 *
 * const { picked, omitted } = separate(user, ['id', 'name'])
 * console.log(picked) // { id: 1, name: 'John' }
 * console.log(omitted) // { email: 'john@example.com', password: 'secret', role: 'admin' }
 *
 * // 用于分离敏感信息
 * const { picked: publicData, omitted: privateData } = separate(user, ['id', 'name', 'email'])
 * ```
 */
declare function separate<T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): SeparateResult<T, K>;

/**
 * 将字符串首字母大写
 *
 * @category String
 * @param str 待处理的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * console.log(capitalize('hello')) // 'Hello'
 * console.log(capitalize('WORLD')) // 'WORLD'
 * console.log(capitalize('')) // ''
 * console.log(capitalize('a')) // 'A'
 * ```
 */
declare function capitalize(str: string): string;
/**
 * 将驼峰命名转换为kebab-case
 *
 * @category String
 * @param str 驼峰命名的字符串
 * @returns kebab-case格式的字符串
 * @example
 * ```ts
 * console.log(camelToKebab('helloWorld')) // 'hello-world'
 * console.log(camelToKebab('firstName')) // 'first-name'
 * console.log(camelToKebab('XMLHttpRequest')) // 'x-m-l-http-request'
 * console.log(camelToKebab('hello')) // 'hello'
 * ```
 */
declare function camelToKebab(str: string): string;
/**
 * 将kebab-case转换为驼峰命名
 *
 * @category String
 * @param str kebab-case格式的字符串
 * @returns 驼峰命名的字符串
 * @example
 * ```ts
 * console.log(kebabToCamel('hello-world')) // 'helloWorld'
 * console.log(kebabToCamel('first-name')) // 'firstName'
 * console.log(kebabToCamel('background-color')) // 'backgroundColor'
 * console.log(kebabToCamel('hello')) // 'hello'
 * ```
 */
declare function kebabToCamel(str: string): string;

/**
 * 生成字符串的简单哈希值
 *
 * @category Utilities
 * @param str 待哈希的字符串
 * @returns 32位哈希值转换为36进制字符串
 * @example
 * ```ts
 * const hash1 = simpleHash('hello world')
 * console.log(hash1) // 'nf5xd4'
 *
 * const hash2 = simpleHash('hello world')
 * console.log(hash1 === hash2) // true，相同字符串产生相同哈希
 *
 * const hash3 = simpleHash('hello world!')
 * console.log(hash1 === hash3) // false，不同字符串产生不同哈希
 * ```
 */
declare function simpleHash(str: string): string;

/**
 * 生成随机UUID字符串
 *
 * @category Utilities
 * @returns 符合UUID v4格式的随机字符串
 * @example
 * ```ts
 * const id1 = getRandomUUID()
 * console.log(id1) // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 *
 * const id2 = getRandomUUID()
 * console.log(id2) // 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
 *
 * // 用于生成唯一标识符
 * const componentId = `component-${getRandomUUID()}`
 * ```
 */
declare function getRandomUUID(): string;

/**
 * 检查值是否为对象类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为对象类型
 * @example
 * ```ts
 * console.log(isObject({})) // true
 * console.log(isObject({ name: 'John' })) // true
 * console.log(isObject([])) // false
 * console.log(isObject(null)) // false
 * console.log(isObject('string')) // false
 * ```
 */
declare function isObject(value: any): value is AnyObject;
/**
 * 检查值是否为数组类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为数组类型
 * @example
 * ```ts
 * console.log(isArray([])) // true
 * console.log(isArray([1, 2, 3])) // true
 * console.log(isArray({})) // false
 * console.log(isArray('string')) // false
 * ```
 */
declare function isArray(value: any): value is any[];
/**
 * 检查值是否为字符串类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为字符串类型
 * @example
 * ```ts
 * console.log(isString('hello')) // true
 * console.log(isString('')) // true
 * console.log(isString(123)) // false
 * console.log(isString(null)) // false
 * ```
 */
declare function isString(value: any): value is string;
/**
 * 检查值是否为有效数字类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为有效数字类型
 * @example
 * ```ts
 * console.log(isNumber(123)) // true
 * console.log(isNumber(0)) // true
 * console.log(isNumber(NaN)) // false
 * console.log(isNumber('123')) // false
 * ```
 */
declare function isNumber(value: any): value is number;
/**
 * 检查值是否为函数类型
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为函数类型
 * @example
 * ```ts
 * console.log(isFunction(() => {})) // true
 * console.log(isFunction(function() {})) // true
 * console.log(isFunction(Math.max)) // true
 * console.log(isFunction('string')) // false
 * ```
 */
declare function isFunction(value: any): value is (...args: any[]) => any;
/**
 * 检查值是否为空（null、undefined、空字符串、空数组、空对象）
 *
 * @category Validator
 * @param value 待检查的值
 * @returns 是否为空值
 * @example
 * ```ts
 * console.log(isEmpty(null)) // true
 * console.log(isEmpty(undefined)) // true
 * console.log(isEmpty('')) // true
 * console.log(isEmpty([])) // true
 * console.log(isEmpty({})) // true
 * console.log(isEmpty([1, 2])) // false
 * console.log(isEmpty({ name: 'John' })) // false
 * console.log(isEmpty('hello')) // false
 * ```
 */
declare function isEmpty(value: any): boolean;

export { StorageTypeSchema, Tree, TreeConfigSchema, TreeStatsSchema, camelToKebab, capitalize, chunk, convertSvgToPng, convertToKebabCase, createStorageConfigSchema, debounce, deepClone, extractFilename, flatten, formatFileSize, getRandomUUID, isArray, isEmpty, isFunction, isNumber, isObject, isString, kebabToCamel, omit, omitUndefined, pick, presetFlex, presetOwl, replaceCurrentColor, separate, simpleHash, sleep, sleepWithCancel, throttle, triggerDownload, unique, useAppStorage, useCopyCode };
export type { AnyObject, AppStorageReturn, DeepPartial, FirstParam, FirstParameter, GetObjectField, MutableByKeys, OmitByKey, PartialByKeys, PickByKey, ReadonlyByKeys, RenameKeys, RequiredByKeys, StorageConfig, StorageConfigInput, StorageType, StringOrVNode, TreeConfig, TreeConfigInput, TreeNode, TreeNodeBase, TreeNodeResult, TreePredicate, TreeStats, TreeTransformer, TreeVisitor, UnionToIntersection };
