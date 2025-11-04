import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * UIStore - UI 狀態管理
 * 負責管理全域 UI 狀態,包含離線模式、漢堡選單、Modal 等
 */
export const useUIStore = defineStore('ui', () => {
  // 離線模式 (移除 Google 服務,使用本地字型)
  const isOfflineMode = ref(localStorage.getItem('offline-mode') === 'true')

  // 手機版漢堡選單開關
  const isMobileMenuOpen = ref(false)

  // Modal 開關
  const isModalOpen = ref(false)
  const modalContent = ref(null)

  /**
   * 切換離線模式
   */
  function toggleOfflineMode() {
    isOfflineMode.value = !isOfflineMode.value
    localStorage.setItem('offline-mode', isOfflineMode.value.toString())
  }

  /**
   * 設定離線模式
   * @param {boolean} value - 是否啟用離線模式
   */
  function setOfflineMode(value) {
    isOfflineMode.value = value
    localStorage.setItem('offline-mode', value.toString())
  }

  /**
   * 切換手機版選單
   */
  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    // 防止背景滾動
    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  /**
   * 關閉手機版選單
   */
  function closeMobileMenu() {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  /**
   * 開啟 Modal
   * @param {Object} content - Modal 內容物件
   */
  function openModal(content) {
    modalContent.value = content
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  /**
   * 關閉 Modal
   */
  function closeModal() {
    isModalOpen.value = false
    modalContent.value = null
    document.body.style.overflow = ''
  }

  return {
    isOfflineMode,
    isMobileMenuOpen,
    isModalOpen,
    modalContent,
    toggleOfflineMode,
    setOfflineMode,
    toggleMobileMenu,
    closeMobileMenu,
    openModal,
    closeModal
  }
})
