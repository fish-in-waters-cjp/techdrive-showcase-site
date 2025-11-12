/**
 * useFormSubmit - 表單送出 Composable
 * 提供表單送出模擬、Loading 狀態、成功/失敗提示
 * 符合 FR-018~020
 */

import { ref } from 'vue'

export function useFormSubmit() {
  const isSubmitting = ref(false)
  const submitStatus = ref(null) // null | 'success' | 'error'
  const submitMessage = ref('')

  /**
   * 模擬表單送出
   * @param {Function} onSuccess - 成功回調
   * @param {Function} onError - 失敗回調
   * @param {number} delay - 模擬延遲時間 (ms)
   * @returns {Promise<void>}
   */
  async function submitForm(onSuccess, onError, delay = 1500) {
    isSubmitting.value = true
    submitStatus.value = null
    submitMessage.value = ''

    try {
      // 模擬 API 呼叫延遲
      await new Promise(resolve => setTimeout(resolve, delay))

      // 模擬成功/失敗 (90% 成功率)
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        submitStatus.value = 'success'
        submitMessage.value = 'form.submit.success'
        if (onSuccess) onSuccess()
      } else {
        submitStatus.value = 'error'
        submitMessage.value = 'form.submit.error'
        if (onError) onError()
      }
    } catch (error) {
      submitStatus.value = 'error'
      submitMessage.value = 'form.submit.error'
      if (onError) onError(error)
    } finally {
      isSubmitting.value = false

      // 3 秒後自動清除狀態
      setTimeout(() => {
        submitStatus.value = null
        submitMessage.value = ''
      }, 3000)
    }
  }

  /**
   * 重置表單狀態
   */
  function resetForm() {
    isSubmitting.value = false
    submitStatus.value = null
    submitMessage.value = ''
  }

  return {
    isSubmitting,
    submitStatus,
    submitMessage,
    submitForm,
    resetForm
  }
}
