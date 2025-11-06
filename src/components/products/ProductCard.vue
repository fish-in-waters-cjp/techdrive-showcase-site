<template>
  <Card variant="elevated" hoverable>
    <template #image>
      <div class="relative">
        <img
          :src="product.thumbnail"
          :alt="product.name"
          class="w-full h-48 object-cover"
        />
        <Badge
          v-if="product.featured"
          variant="primary"
          class="absolute top-2 right-2"
        >
          {{ $t('products.badge.featured') }}
        </Badge>
      </div>
    </template>

    <template #header>
      <div class="flex items-start justify-between">
        <h3 class="text-h4">{{ product.name }}</h3>
      </div>
      <p v-if="product.category" class="text-sm text-gray-500 mt-1">
        {{ product.category }}
      </p>
    </template>

    <template #default>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
      <ul class="space-y-1">
        <li
          v-for="(highlight, index) in product.highlights.slice(0, 3)"
          :key="index"
          class="flex items-start text-sm text-gray-500"
        >
          <svg class="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          {{ highlight }}
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <Button
          variant="primary"
          :href="`/product-detail.html?id=${product.slug}`"
          class="flex-1"
        >
          {{ $t('products.viewDetails') }}
        </Button>
        <ProductCompareButton :product="product" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import ProductCompareButton from './ProductCompareButton.vue'

const { t } = useI18n()

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
