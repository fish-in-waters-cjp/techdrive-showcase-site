<template>
  <div class="products-page">
    <Header />

    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-brand text-white py-20">
        <div class="container">
          <Breadcrumb :items="breadcrumbItems" class="mb-8 text-white" />
          <h1 class="text-h1 mb-4">{{ $t('products.title') }}</h1>
          <p class="text-xl max-w-2xl">{{ $t('products.subtitle') }}</p>
        </div>
      </section>

      <!-- Products List Section -->
      <section class="section">
        <div class="container">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Sidebar - Filters -->
            <aside class="lg:w-64 flex-shrink-0">
              <ProductFilter
                v-model:category="selectedCategory"
                v-model:priceRange="selectedPriceRange"
                @update="handleFilterUpdate"
              />
            </aside>

            <!-- Main Content - Product Grid -->
            <div class="flex-1">
              <div class="flex justify-between items-center mb-6">
                <p class="text-gray-600">
                  {{ $t('products.showing', { count: filteredProducts.length }) }}
                </p>
              </div>

              <ProductGrid :products="filteredProducts" />
            </div>
          </div>
        </div>
      </section>

      <!-- Compare Panel (固定在底部) -->
      <ComparePanel />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import ProductFilter from '@/components/products/ProductFilter.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'
import ComparePanel from '@/components/products/ComparePanel.vue'

const { t } = useI18n()
const products = ref([])
const selectedCategory = ref('all')
const selectedPriceRange = ref('all')

const breadcrumbItems = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.products'), path: null }
])

const filteredProducts = computed(() => {
  let result = products.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Filter by price range (if needed)
  // Price filtering logic here

  return result
})

const handleFilterUpdate = () => {
  // Handle filter updates if needed
}

onMounted(async () => {
  try {
    const response = await fetch('/data/products.json')
    products.value = await response.json()
  } catch (error) {
    console.error('Failed to load products:', error)
  }
})
</script>
