// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'style/comma-dangle': 'off',
    'ts/no-empty-object-type': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
  },
})
