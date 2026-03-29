export default defineAppConfig({
  aiChat: {
    faqQuestions: [
      {
        category: '快速入门',
        items: [
          '如何安装和引入 @movk/core？',
          '在 Vue 项目中如何使用 Tree-Shaking？',
          '如何获得完整的 TypeScript 类型提示？',
        ]
      },
      {
        category: '树形结构',
        items: [
          '如何用 Tree.fromList 将扁平数组转为树形结构？',
          '如何用 Tree.filter 过滤树节点？',
          '如何用 Tree.find 查找特定节点？',
          'Tree.transform 如何转换树节点数据？',
        ]
      },
      {
        category: '字符串与对象',
        items: [
          '如何用 camelCase / kebabCase 转换字符串格式？',
          '如何用 pick / omit 选择或排除对象属性？',
          '如何用 getPath / setPath 操作嵌套路径？',
          'deepClone 和 deepMerge 有什么区别？',
        ]
      },
      {
        category: 'URL 处理',
        items: [
          '如何用 getQueryParam 获取 URL 查询参数？',
          '如何用 buildUrl / joinUrl 构建完整 URL？',
          '如何用 isValidUrl 验证 URL 合法性？',
        ]
      },
      {
        category: '异步与数组',
        items: [
          '如何用 debounce 和 throttle 控制调用频率？',
          'sleepWithCancel 和 sleep 有什么区别？',
          '如何用 chunk / unique / flatten 处理数组？',
        ]
      },
      {
        category: 'Vue Composables',
        items: [
          'useAppStorage 如何使用？',
          'useCopyCode 如何使用？',
        ]
      },
    ]
  },
  header: {
    title: 'Movk Core'
  },
  github: {
    rootDir: 'docs',
    suffix: 'ts'
  },
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'zinc'
    },
    prose: {
      codeIcon: {
        source: 'i-lucide-file-code',
        example: 'i-lucide-app-window-mac',
      }
    }
  },
  toc: {
    bottom: {
      links: [
        {
          icon: 'i-lucide-message-circle-code',
          to: 'https://core.mhaibaraai.cn/llms.txt',
          target: '_blank',
          label: 'Open LLMs'
        },
      ]
    }
  },
  footer: {
    credits: `Copyright © 2024 - ${new Date().getFullYear()} YiXuan - <span class="text-highlighted">MIT License</span>`,
    socials: [
      {
        'icon': 'i-simple-icons-nuxt',
        'to': 'https://nuxt.com/',
        'target': '_blank',
        'aria-label': 'Nuxt Website'
      },
      {
        'icon': 'i-lucide-mail',
        'to': 'mailto:mhaibaraai@gmail.com',
        'target': '_blank',
        'aria-label': 'YiXuan\'s Gmail'
      }
    ]
  }
})
