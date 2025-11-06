<template>
  <div class="product-info">
    <!-- Title & Badge -->
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <Badge v-if="product.featured" variant="primary">
          {{ $t('products.badge.featured') }}
        </Badge>
        <Badge v-if="product.category" variant="info">
          {{ product.category }}
        </Badge>
      </div>
      <h1 class="text-h1">{{ product.name }}</h1>
    </div>

    <!-- Description -->
    <p class="text-xl text-gray-600 mb-6">{{ product.description }}</p>

    <!-- Highlights -->
    <div class="mb-8">
      <h2 class="text-h3 mb-4">{{ $t('products.highlights') }}</h2>
      <ul class="space-y-3">
        <li
          v-for="(highlight, index) in product.highlights"
          :key="index"
          class="flex items-start"
        >
          <svg class="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-gray-700">{{ highlight }}</span>
        </li>
      </ul>
    </div>

    <!-- Downloads -->
    <div v-if="product.downloads && product.downloads.length > 0" class="mb-8">
      <h2 class="text-h3 mb-4">{{ $t('products.downloads') }}</h2>
      <div class="space-y-2">
        <a
          v-for="(download, index) in product.downloads"
          :key="index"
          :href="download.url"
          class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
        >
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="font-medium">{{ download.name }}</span>
          </div>
          <Badge variant="info" size="sm">{{ download.type }}</Badge>
        </a>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <Button
        variant="primary"
        size="lg"
        href="/contact.html"
        class="flex-1"
      >
        {{ $t('products.inquire') }}
      </Button>
      <ProductCompareButton :product="product" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import ProductCompareButton from '@/components/products/ProductCompareButton.vue'

const { t } = useI18n()

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
