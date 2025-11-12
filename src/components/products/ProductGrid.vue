<template>
  <div>
    <div v-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500">{{ $t('products.noResults') }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductCard from './ProductCard.vue'

const { t } = useI18n()

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})
</script>
