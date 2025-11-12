<template>
  <div class="product-filter bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-h4 mb-4">{{ $t('products.filter.title') }}</h3>

    <!-- Category Filter -->
    <div class="mb-6">
      <label class="block text-sm font-semibold mb-3">
        {{ $t('products.filter.category') }}
      </label>
      <div class="space-y-2">
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            :value="'all'"
            v-model="localCategory"
            class="w-4 h-4 text-blue-600"
          />
          <span class="ml-2 text-gray-700">{{ $t('products.filter.all') }}</span>
        </label>
        <label
          v-for="cat in categories"
          :key="cat"
          class="flex items-center cursor-pointer"
        >
          <input
            type="radio"
            :value="cat"
            v-model="localCategory"
            class="w-4 h-4 text-blue-600"
          />
          <span class="ml-2 text-gray-700">{{ cat }}</span>
        </label>
      </div>
    </div>

    <!-- Reset Button -->
    <Button
      variant="outline"
      class="w-full"
      @click="resetFilters"
    >
      {{ $t('products.filter.reset') }}
    </Button>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
const emit = defineEmits(['update:category', 'update:priceRange', 'update'])

const props = defineProps({
  category: {
    type: String,
    default: 'all'
  },
  priceRange: {
    type: String,
    default: 'all'
  }
})

const localCategory = ref(props.category)
const categories = ref(['主控單元', '感測器', '顯示模組', '電源管理'])

watch(localCategory, (newVal) => {
  emit('update:category', newVal)
  emit('update')
})

const resetFilters = () => {
  localCategory.value = 'all'
}
</script>
