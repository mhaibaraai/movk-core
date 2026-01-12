export default defineAppConfig({
  vercelAnalytics: {
    enable: true,
    debug: false
  },
  aiChat: {
    faqQuestions: [
      {
        category: '快速入门',
        items: [
          '安装与引入',
          'Tree-Shaking 支持',
          'TypeScript 类型提示',
          '查看函数列表'
        ]
      },
      {
        category: '树形数据',
        items: [
          '扁平数组转树形',
          '树形转扁平数组',
          '查找/过滤节点',
          '插入/删除节点'
        ]
      },
      {
        category: '数组处理',
        items: [
          '数组分块',
          '去重',
          '安全取值',
          '打乱/分组'
        ]
      },
      {
        category: '对象操作',
        items: [
          '深克隆',
          '排除属性',
          '键名转换',
          '对象合并'
        ]
      },
      {
        category: '命名转换',
        items: [
          'camelCase',
          'snake_case',
          'kebab-case',
          'PascalCase'
        ]
      },
      {
        category: '异步控制',
        items: [
          '防抖',
          '节流',
          '并发控制',
          '延迟执行'
        ]
      },
      {
        category: 'Vue 集成',
        items: [
          'Vue 项目引入',
          'useAppStorage vs localStorage',
          'useCopyCode 实现',
          'Composables vs 普通函数'
        ]
      }
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
