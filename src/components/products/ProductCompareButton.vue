<template>
  <button
    @click="toggleCompare"
    :class="buttonClasses"
    :aria-label="isInCompare ? $t('products.compare.remove') : $t('products.compare.add')"
    :disabled="!canAdd && !isInCompare"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        v-if="!isInCompare"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
      <path
        v-else
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCompareStore } from '@/stores/compare'

const { t } = useI18n()
const compareStore = useCompareStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isInCompare = computed(() => compareStore.hasItem(props.product.id))
const canAdd = computed(() => compareStore.canAdd)

const buttonClasses = computed(() => {
  const base = 'px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
  if (isInCompare.value) {
    return `${base} bg-red-100 text-red-700 hover:bg-red-200`
  }
  if (!canAdd.value) {
    return `${base} bg-gray-100 text-gray-400 cursor-not-allowed`
  }
  return `${base} bg-blue-100 text-blue-700 hover:bg-blue-200`
})

const toggleCompare = () => {
  if (isInCompare.value) {
    compareStore.removeItem(props.product.id)
  } else {
    const added = compareStore.addItem(props.product)
    if (!added) {
      alert(t('products.compare.limitReached'))
    }
  }
}
</script>
