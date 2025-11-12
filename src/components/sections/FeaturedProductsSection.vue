<template>
  <section class="featured-products-section section">
    <div class="container">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-h2 mb-4">{{ $t('featuredProducts.title') }}</h2>
          <p class="text-xl text-gray-600">
            {{ $t('featuredProducts.subtitle') }}
          </p>
        </div>
        <Button
          variant="outline"
          href="/products.html"
          class="hidden md:inline-flex"
        >
          {{ $t('featuredProducts.viewAll') }}
        </Button>
      </div>

      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-500">{{ $t('common.loading') }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="product in featuredProducts"
          :key="product.id"
          variant="elevated"
          hoverable
        >
          <template #image>
            <img
              :src="product.thumbnail"
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
          </template>

          <template #header>
            <div class="flex items-start justify-between">
              <h3 class="text-h4">{{ product.name }}</h3>
              <Badge v-if="product.featured" variant="primary">
                {{ $t('products.badge.featured') }}
              </Badge>
            </div>
          </template>

          <template #default>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
            <ul class="space-y-1">
              <li v-for="(highlight, index) in product.highlights" :key="index" class="flex items-start text-sm text-gray-500">
                <svg class="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ highlight }}
              </li>
            </ul>
          </template>

          <template #footer>
            <Button
              variant="primary"
              :href="`/product-detail.html?id=${product.slug}`"
              class="w-full"
            >
              {{ $t('products.viewDetails') }}
            </Button>
          </template>
        </Card>
      </div>

      <div class="text-center mt-8 md:hidden">
        <Button variant="outline" href="/products.html">
          {{ $t('featuredProducts.viewAll') }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'

const { t } = useI18n()
const featuredProducts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/data/products.json')
    const data = await response.json()
    featuredProducts.value = data.filter(p => p.featured).slice(0, 3)
  } catch (error) {
    console.error('Failed to load products:', error)
  } finally {
    loading.value = false
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
