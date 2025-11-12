import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18nInstance } from './lib/i18n'
import './styles/globals.css'

// 此檔案將由各個頁面的 main.js 匯入使用
export async function createVueApp(rootComponent) {
  const app = createApp(rootComponent)
  const pinia = createPinia()
  const i18n = await createI18nInstance()

  app.use(pinia)
  app.use(i18n)

  return app
}
