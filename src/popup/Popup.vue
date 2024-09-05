<script setup lang="ts">
import { extensionEnabled, noModifyCurrentSite } from '~/logic/storage'
// import { sendMessage } from 'webext-bridge/content-script'
// import browser from 'webextension-polyfill'
import { addToWhitelist, removeFromWhitelist, isWhitelisted } from '~/contentScripts/whitelist-manager'

async function toggleExtension() {
  console.log('isEnabled', extensionEnabled.value);
  // 这句其实没用
  // await sendMessage('toggle-extension', { extensionEnabled: extensionEnabled.value });
}

const currentHostname = ref('')
onMounted(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  if (tab.url) {
    currentHostname.value = new URL(tab.url).hostname
    noModifyCurrentSite.value = (await isWhitelisted(currentHostname.value))
  }
})

async function toggleCurrentSite() {
  if (noModifyCurrentSite.value) {
    await addToWhitelist(currentHostname.value)
  } else {
    await removeFromWhitelist(currentHostname.value)
  }
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-gray-700">
    <h1 class="text-lg font-bold mb-4">Setting</h1>
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
          Open All Links In New Tab
        </label>
      </div>
      <div v-if="false && extensionEnabled" class="flex items-center mb-4">
        <input 
          id="modify-current-site" 
          type="checkbox" 
          v-model="noModifyCurrentSite"
          @change="toggleCurrentSite"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        >
        <label for="modify-current-site" class="ml-2 text-sm font-medium text-gray-900">
          不修改本网站
        </label>
      </div>
    </form>

    <!-- 添加 GitHub 链接 -->
    <div class="mt-4 flex justify-center">
      <a href="https://github.com/cunzaizhuyi/open-new-tab-extension" target="_blank" class="flex items-center text-blue-600 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="w-5 h-5 mr-2">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.83-.01-1.5-2.24.49-2.71-1.08-2.71-1.08-.36-.91-.88-1.15-.88-1.15-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.22 1.86.87 2.31.67.07-.51.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.84A7.66 7.66 0 0 1 8 2.5c.68 0 1.36.09 2 .26 1.53-1.06 2.2-.84 2.2-.84.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.66 3.95.29.25.55.74.55 1.49 0 1.08-.01 1.95-.01 2.21 0 .21.15.46.55.38C13.71 14.54 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
    </div>
  </main>
</template>
