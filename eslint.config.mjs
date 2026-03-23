// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'style/comma-dangle': 'off',
    'ts/no-empty-object-type': 'off',
    'node/prefer-global/process': 'off',
  },
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: 1 }],
  },
}, {
  files: ['docs/content/**/*.md'],
  rules: {
    'markdown/no-multiple-h1': 'off',
    'markdown/no-empty-links': 'off',
    'markdown/no-missing-atx-heading-space': 'off',
  },
}, {
  files: ['bin/**'],
  rules: {
    'no-console': 'off',
  },
})
