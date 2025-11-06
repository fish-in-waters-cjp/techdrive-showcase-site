import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createI18nInstance } from '@/lib/i18n'
import { configureValidation } from '@/lib/validation'
import '@/styles/globals.css'

// 初始化應用程式
async function initApp() {
  const app = createApp(App)
  const pinia = createPinia()
  const i18n = await createI18nInstance()

  // 配置表單驗證
  configureValidation(i18n)

  app.use(pinia)
  app.use(i18n)

  app.mount('#app')
}

initApp()
