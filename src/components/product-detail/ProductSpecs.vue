<template>
  <div class="product-specs">
    <h2 class="text-h2 mb-6">{{ $t('products.specifications') }}</h2>

    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table class="w-full">
        <tbody>
          <tr
            v-for="(spec, index) in product.specs"
            :key="index"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <td class="px-6 py-4 font-medium text-gray-900 w-1/3">
              {{ spec.label }}
            </td>
            <td class="px-6 py-4 text-gray-600">
              {{ spec.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
