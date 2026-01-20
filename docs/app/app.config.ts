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
          '如何安装和引入 @movk/core？',
          '如何查找我需要的函数？',
          '在 Vue 项目中如何使用？',
        ]
      },
      {
        category: '核心功能',
        items: [
          '如何处理树形数据结构？',
          '有哪些 URL 处理函数？',
          '如何实现防抖和节流？',
          '如何进行字符串大小写转换？',
        ]
      },
      {
        category: 'Vue Composables',
        items: [
          'useAppStorage 如何使用？',
          'useCopyCode 如何使用？',
        ]
      },
      {
        category: 'TypeScript 支持',
        items: [
          '如何获得完整的类型提示？',
          '有哪些可用的类型定义？',
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
