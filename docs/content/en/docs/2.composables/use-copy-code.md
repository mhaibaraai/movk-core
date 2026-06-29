---
title: useCopyCode
description: A Vue composable that copies text to the clipboard using the async Clipboard API, with a legacy execCommand fallback for older browsers.
seo:
  title: useCopyCode
  description: A Vue composable that copies text to the clipboard using the async Clipboard API, with a legacy execCommand fallback for older browsers.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useCopyCode.ts
---

## Usage

`useCopyCode` is a simple and practical composable that makes it easy to implement "copy to clipboard" functionality. It is an async function that returns a `Promise<boolean>` indicating whether the copy was successful.

The function prefers the modern, secure `navigator.clipboard` API. If the environment does not support it (e.g., on non-HTTPS pages or in older browsers), it automatically falls back to the legacy `document.execCommand('copy')` method to ensure maximum compatibility.

```vue
<script setup lang="ts">
import { useCopyCode } from '@movk/core'
import { ref } from 'vue'

const sourceText = ref('This is the text to be copied.')
const copied = ref(false)
const showMessage = ref(false)

async function handleCopy() {
  const success = await useCopyCode(sourceText.value)
  if (success) {
    copied.value = true
    showMessage.value = true
    console.log('Text successfully copied to clipboard!')
    setTimeout(() => showMessage.value = false, 2000)
  }
  else {
    copied.value = false
    showMessage.value = true
    console.error('Copy failed.')
    setTimeout(() => showMessage.value = false, 2000)
  }
}
</script>

<template>
  <div>
    <textarea v-model="sourceText" rows="4" cols="50" />
    <button @click="handleCopy">
      {{ copied ? 'Copied!' : 'Copy text' }}
    </button>
    <p v-if="showMessage" :class="copied ? 'success' : 'error'">
      {{ copied ? 'Copied successfully!' : 'Copy failed. Please check browser permissions or copy manually.' }}
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
`useCopyCode` can only be executed in a client-side (browser) environment. If called on the server side (SSR), it will print a warning to the console and return `false`.
::

## API

### `useCopyCode(text)`{lang="ts-type"}

Asynchronously copies the specified text string to the user's clipboard.

### Parameters

::field-group
  ::field{name="text" type="string" required}
  The text content to copy to the clipboard.
  ::
::

### Returns

::field-group
  ::field{name="Promise<boolean>"}
  Returns a Promise that resolves after the operation completes:
  - `true`: indicates the text was copied successfully.
  - `false`: indicates the copy failed.
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
