---
title: useCopyCode
description: 一个用于将文本复制到剪贴板的组合式函数，支持现代 Clipboard API 并优雅地回退到传统方法。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useCopyCode.ts
---

## 用法

`useCopyCode` 是一个简单而实用的组合式函数，可以轻松实现“复制到剪贴板”功能。它是一个异步函数，会返回一个表示复制是否成功的 `Promise<boolean>`。

该函数优先使用现代的、安全的 `navigator.clipboard` API。如果环境不支持（例如在非 HTTPS 页面或旧版浏览器中），它会自动回退到使用 `document.execCommand('copy')` 的传统方法，以确保最大程度的兼容性。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useCopyCode } from '@movk/core'

const sourceText = ref('这是要被复制的文本。')
const copied = ref(false)
const showMessage = ref(false)

async function handleCopy() {
  const success = await useCopyCode(sourceText.value)
  if (success) {
    copied.value = true
    showMessage.value = true
    console.log('文本已成功复制到剪贴板！')
    setTimeout(() => showMessage.value = false, 2000)
  }
  else {
    copied.value = false
    showMessage.value = true
    console.error('复制失败。')
    setTimeout(() => showMessage.value = false, 2000)
  }
}
</script>

<template>
  <div>
    <textarea v-model="sourceText" rows="4" cols="50"></textarea>
    <button @click="handleCopy">
      {{ copied ? '已复制!' : '复制文本' }}
    </button>
    <p v-if="showMessage" :class="copied ? 'success' : 'error'">
      {{ copied ? '复制成功！' : '复制失败，请检查浏览器权限或手动复制。' }}
    </p>
  </div>
</template>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
```

::note
`useCopyCode` 只能在客户端环境（浏览器）中执行。如果在服务器端（SSR）调用，它将在控制台打印警告并返回 `false`。
::

## API

### `useCopyCode(text)`{lang="ts-type"}

异步地将指定的文本字符串复制到用户的剪贴板。

#### 参数

::field-group
  ::field{name="text" type="string" required}
  要复制到剪贴板的文本内容。
  ::
::

#### 返回值

::field-group
  ::field{name="Promise<boolean>"}
  返回一个 Promise，该 Promise 在操作完成后解析：
  - `true`：表示文本已成功复制。
  - `false`：表示复制失败。
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
