import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * CompareStore - 產品比較清單管理
 * 負責管理使用者選取的產品比較清單 (最多3個)
 */
export const useCompareStore = defineStore('compare', () => {
  // 比較清單 (最多3個產品)
  const items = ref([])
  const MAX_ITEMS = 3

  // 計算屬性
  const count = computed(() => items.value.length)
  const canAdd = computed(() => count.value < MAX_ITEMS)
  const isFull = computed(() => count.value >= MAX_ITEMS)
  const isEmpty = computed(() => count.value === 0)

  /**
   * 加入產品至比較清單
   * @param {Object} product - 產品物件 { id, name, image, category, price }
   * @returns {boolean} - 是否成功加入
   */
  function addItem(product) {
    // 檢查是否已滿
    if (isFull.value) {
      return false
    }

    // 檢查是否已存在
    if (items.value.some(p => p.id === product.id)) {
      return false
    }

    items.value.push(product)
    saveToLocalStorage()
    return true
  }

  /**
   * 從比較清單移除產品
   * @param {string} productId - 產品 ID
   */
  function removeItem(productId) {
    items.value = items.value.filter(p => p.id !== productId)
    saveToLocalStorage()
  }

  /**
   * 清空比較清單
   */
  function clear() {
    items.value = []
    saveToLocalStorage()
  }

  /**
   * 檢查產品是否在比較清單中
   * @param {string} productId - 產品 ID
   * @returns {boolean}
   */
  function hasItem(productId) {
    return items.value.some(p => p.id === productId)
  }

  /**
   * 儲存至 localStorage
   */
  function saveToLocalStorage() {
    localStorage.setItem('compare-items', JSON.stringify(items.value))
  }

  /**
   * 從 localStorage 載入
   */
  function loadFromLocalStorage() {
    const stored = localStorage.getItem('compare-items')
    if (stored) {
      try {
        items.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load compare items from localStorage', e)
        items.value = []
      }
    }
  }

  // 初始化時從 localStorage 載入
  loadFromLocalStorage()

  return {
    items,
    count,
    canAdd,
    isFull,
    isEmpty,
    MAX_ITEMS,
    addItem,
    removeItem,
    clear,
    hasItem
  }
})
