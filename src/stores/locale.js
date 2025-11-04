import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * LocaleStore - 語言切換狀態管理
 * 負責管理網站的當前語言設定 (zh-TW / en)
 */
export const useLocaleStore = defineStore('locale', () => {
  // 支援的語言列表
  const availableLocales = ['zh-TW', 'en']

  // 當前語言 (預設繁體中文)
  const currentLocale = ref(localStorage.getItem('locale') || 'zh-TW')

  // 計算當前語言的顯示名稱
  const localeDisplayName = computed(() => {
    return currentLocale.value === 'zh-TW' ? '繁體中文' : 'English'
  })

  /**
   * 切換語言
   * @param {string} locale - 語言代碼 ('zh-TW' 或 'en')
   */
  function setLocale(locale) {
    if (availableLocales.includes(locale)) {
      currentLocale.value = locale
      localStorage.setItem('locale', locale)
      // 觸發文件 lang 屬性更新
      document.documentElement.lang = locale
    }
  }

  /**
   * 切換到下一個語言 (zh-TW ⇄ en)
   */
  function toggleLocale() {
    const newLocale = currentLocale.value === 'zh-TW' ? 'en' : 'zh-TW'
    setLocale(newLocale)
  }

  return {
    currentLocale,
    availableLocales,
    localeDisplayName,
    setLocale,
    toggleLocale
  }
})
