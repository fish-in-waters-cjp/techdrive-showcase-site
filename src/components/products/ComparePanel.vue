<template>
  <Transition name="slide-up">
    <div v-if="count > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-lg z-40">
      <div class="container py-4">
        <div class="flex items-center justify-between">
          <!-- Left: Selected Products -->
          <div class="flex items-center gap-4">
            <span class="font-semibold text-gray-900">
              {{ $t('products.compare.title') }}
              ({{ count }}/{{ MAX_ITEMS }})
            </span>
            <div class="flex gap-2">
              <div
                v-for="product in items"
                :key="product.id"
                class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
              >
                <span class="text-sm">{{ product.name }}</span>
                <button
                  @click="removeItem(product.id)"
                  class="text-gray-500 hover:text-red-600 transition-colors"
                  :aria-label="$t('products.compare.remove')"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Right: Actions -->
          <div class="flex gap-3">
            <Button
              variant="outline"
              size="md"
              @click="clearAll"
            >
              {{ $t('products.compare.clear') }}
            </Button>
            <Button
              variant="primary"
              size="md"
              @click="viewComparison"
              :disabled="count < 2"
            >
              {{ $t('products.compare.view') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCompareStore } from '@/stores/compare'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
const compareStore = useCompareStore()

const items = computed(() => compareStore.items)
const count = computed(() => compareStore.count)
const MAX_ITEMS = 3

const removeItem = (productId) => {
  compareStore.removeItem(productId)
}

const clearAll = () => {
  compareStore.clear()
}

const viewComparison = () => {
  // TODO: Navigate to comparison page or show modal
  alert('Comparison feature: Coming soon!')
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
