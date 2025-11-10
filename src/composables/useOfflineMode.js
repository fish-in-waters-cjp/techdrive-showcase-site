/**
 * useOfflineMode - 無外聯模式 Composable
 * 檢測是否啟用無外聯模式,移除 Google Fonts/Maps/iFrame
 * 符合 FR-032
 */

import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

export function useOfflineMode() {
  const uiStore = useUIStore()

  /**
   * 是否啟用離線模式
   */
  const isOffline = computed(() => uiStore.isOfflineMode)

  /**
   * 切換離線模式
   */
  function toggleOfflineMode() {
    uiStore.toggleOfflineMode()

    // 重新載入頁面以套用變更 (移除/載入 Google Fonts)
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  /**
   * 取得字體來源 (Google Fonts 或本地字體)
   * @returns {string} CSS font-family
   */
  function getFontFamily() {
    return isOffline.value
      ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      : '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }

  /**
   * 檢查是否應載入外部資源
   * @param {string} resourceType - 'fonts' | 'maps' | 'analytics'
   * @returns {boolean}
   */
  function shouldLoadExternalResource(resourceType) {
    if (isOffline.value) {
      return false
    }

    // 未來可擴充個別資源類型的控制
    const allowedResources = {
      fonts: true,
      maps: true,
      analytics: false // 預設不載入 analytics (spec 要求)
    }

    return allowedResources[resourceType] ?? false
  }

  /**
   * 取得地圖 URL (Google Maps 或靜態占位圖)
   * @param {Object} options - { lat, lng, zoom }
   * @returns {string}
   */
  function getMapUrl(options = {}) {
    if (isOffline.value) {
      // 返回靜態地圖占位圖
      return '/assets/placeholders/static-map.png'
    }

    // 返回 Google Maps embed URL
    const { lat = 25.033, lng = 121.565, zoom = 15 } = options
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzAwLjAiTiAxMjHCsDMzJzU0LjAiRQ!5e0!3m2!1sen!2stw!4v1234567890!5m2!1sen!2stw&z=${zoom}`
  }

  return {
    isOffline,
    toggleOfflineMode,
    getFontFamily,
    shouldLoadExternalResource,
    getMapUrl
  }
}
