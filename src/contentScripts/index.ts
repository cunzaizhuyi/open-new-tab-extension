/* eslint-disable no-console */
import { onMessage } from 'webext-bridge/content-script'
import browser from 'webextension-polyfill';
import { extensionEnabled } from '~/logic/storage';
import { handleMedium } from '~/contentScripts/medium-link-handler';
import { handleDevto } from '~/contentScripts/devto';
import { isWhitelisted } from '~/contentScripts/whitelist-manager';
import { sites } from './sites';
// import { createApp } from 'vue'
// import App from './views/App.vue'
// import { setupApp } from '~/logic/common-setup'


// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(async () => {
  console.info('[vitesse-webext] Hello world from content script')

  let isExtensionEnabled = (await browser.storage.local.get('extensionEnabled'))['extensionEnabled'] === 'true';
  // 监听设置项变化
  browser.storage.onChanged.addListener((changes, area) => {
    if (changes.extensionEnabled) {
      console.log('changes.extensionEnabled', changes.extensionEnabled)
      isExtensionEnabled = changes.extensionEnabled?.newValue === 'true'
      console.log('passed isExtensionEnabled', isExtensionEnabled);
    }
  });

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })


  // mount component to context window
  // const container = document.createElement('div')
  // container.id = __NAME__
  // const root = document.createElement('div')
  // const styleEl = document.createElement('link')
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  // styleEl.setAttribute('rel', 'stylesheet')
  // styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  // shadowDOM.appendChild(styleEl)
  // shadowDOM.appendChild(root)
  // document.body.appendChild(container)
  // const app = createApp(App)
  // setupApp(app)
  // app.mount(root)


  // 检查URL是否是有效的外部链接
  function isValidExternalLink(url: string): boolean {
    return url.startsWith('http://') || 
           url.startsWith('https://') || 
           url.startsWith('//');
  }

  // 优化的函数来处理链接点击
  async function handleLinkClick(event: MouseEvent) {
    if (!isExtensionEnabled) return;

    // 检查当前网站是否在白名单中
    const currentHostname = window.location.hostname;
    // if (await isWhitelisted(currentHostname)) {
    //   console.log('Current site is whitelisted, not modifying links');
    //   return;
    // }

    if (sites.includes(currentHostname)) {
      handleMedium(event);
      handleDevto(event);
      return;
    }

    // 适用于大多数网站的 通用逻辑
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    if (link instanceof HTMLAnchorElement && link.href) {
      // 检查链接是否是有效的外部链接
      if (isValidExternalLink(link.href)) {
        event.preventDefault();
        window.open(link.href, '_blank');
      }
    }
  }

  // 立即添加事件监听器
  document.addEventListener('click', handleLinkClick, true);

})()
