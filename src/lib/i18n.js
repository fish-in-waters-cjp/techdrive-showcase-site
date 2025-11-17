import { createI18n } from 'vue-i18n'

// 載入翻譯檔案
async function loadLocaleMessages() {
  const locales = ['zh-TW', 'en']
  const messages = {}
  const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

  for (const locale of locales) {
    try {
      const response = await fetch(`${basePath}/locales/${locale}.json`)
      messages[locale] = await response.json()
    } catch (error) {
      console.error(`Failed to load locale ${locale}:`, error)
      messages[locale] = {}
    }
  }

  return messages
}

// 初始化 i18n
export async function createI18nInstance() {
  const messages = await loadLocaleMessages()

  // 從 localStorage 或預設使用繁體中文
  const savedLocale = localStorage.getItem('locale') || 'zh-TW'

  return createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: savedLocale,
    fallbackLocale: 'zh-TW',
    messages,
    globalInjection: true, // 全域注入 $t
    missingWarn: false,
    fallbackWarn: false
  })
}

export default createI18nInstance
