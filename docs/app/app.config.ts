export default defineAppConfig({
  github: {
    rootDir: 'docs'
  },
  ui: {
    colors: {
      primary: 'green'
    },
    prose: {
      codeIcon: {
        source: 'i-lucide-file-code-2',
        example: 'i-lucide-box',
      }
    }
  },
  toc: {
    bottom: {
      links: [
        {
          icon: 'i-lucide-brain',
          to: 'https://core.mhaibaraai.cn/llms.txt',
          target: '_blank',
          label: 'Open LLMs'
        },
        {
          icon: 'i-lucide-link',
          to: 'https://core.mhaibaraai.cn/__link-checker__/link-checker-report.html',
          target: '_blank',
          label: 'Open Link Checker'
        }
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
