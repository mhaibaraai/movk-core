export interface FaqCategory {
  category: string
  items: string[]
}

export function useFaq() {
  const faqQuestions: FaqCategory[] = [
    {
      category: '入门指南',
      items: [
        '如何安装和引入？',
        '@movk/core 支持 Tree-Shaking 吗？',
        '如何查看所有可用函数？',
        '在 TypeScript 项目中如何获得类型提示？'
      ]
    },
    {
      category: '树形结构操作',
      items: [
        '如何将扁平数组转为树形结构？',
        '如何将树形结构转为扁平数组？',
        '如何在树中查找特定节点？',
        '如何过滤树中的节点？',
        '如何在树中插入或删除节点？'
      ]
    },
    {
      category: '数组操作',
      items: [
        '如何对数组进行分块处理？',
        '如何实现数组去重？',
        '如何安全地获取数组元素？',
        '如何打乱数组顺序？',
        '如何对数组进行分组？'
      ]
    },
    {
      category: '对象处理',
      items: [
        '如何深度克隆对象？',
        '如何从对象中排除某些属性？',
        '如何将对象键名转为 kebab-case？',
        '如何合并多个对象？'
      ]
    },
    {
      category: '字符串命名转换',
      items: [
        '如何转换为驼峰命名？',
        '如何转换为蛇形命名？',
        '如何转换为短横线命名？',
        '如何转换为帕斯卡命名？'
      ]
    },
    {
      category: '异步操作',
      items: [
        '如何实现防抖？',
        '如何实现节流？',
        '如何控制并发请求数量？',
        '如何实现延迟执行？'
      ]
    },
    {
      category: 'Vue 项目集成',
      items: [
        '如何在 Vue 项目中使用？',
        'useAppStorage 与 localStorage 有什么区别？',
        'useCopyCode 如何实现代码复制功能？',
        'Vue 项目应该用 Composables 还是普通函数？'
      ]
    }
  ]

  return { faqQuestions }
}
