import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/globals.css'

// 此檔案將由各個頁面的 main.js 匯入使用
export function createVueApp(rootComponent) {
  const app = createApp(rootComponent)
  const pinia = createPinia()

  app.use(pinia)

  return app
}
