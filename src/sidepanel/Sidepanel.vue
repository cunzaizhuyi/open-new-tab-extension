<script setup lang="ts">
import { extensionEnabled } from '~/logic/storage'
// import { sendMessage } from 'webext-bridge/content-script'
// import browser from 'webextension-polyfill'

async function toggleExtension() {
  console.log('isEnabled', extensionEnabled.value);
  // 这句其实没用
  // await sendMessage('toggle-extension', { extensionEnabled: extensionEnabled.value });
}
</script>

<template>
  <main class="w-full px-4 py-5 text-gray-700">
    <h1 class="text-lg font-bold mb-4">插件设置</h1>
    <form @submit.prevent>
      <div class="flex items-center mb-4">
        <input 
          id="enable-extension" 
          type="checkbox" 
          v-model="extensionEnabled" 
          @change="toggleExtension"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        >
        <label for="enable-extension" class="ml-2 text-sm font-medium text-gray-900">
          用新标签页打开链接
        </label>
      </div>
    </form>
  </main>
</template>
