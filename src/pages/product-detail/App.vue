<template>
  <div class="product-detail-page">
    <Header />

    <main>
      <div v-if="loading" class="container py-20 text-center">
        <p class="text-gray-500">{{ $t('common.loading') }}</p>
      </div>

      <div v-else-if="!product" class="container py-20 text-center">
        <h1 class="text-h2 mb-4">{{ $t('products.notFound') }}</h1>
        <Button variant="primary" href="/products.html">
          {{ $t('products.backToList') }}
        </Button>
      </div>

      <div v-else>
        <!-- Breadcrumb -->
        <section class="bg-gray-50 py-4">
          <div class="container">
            <Breadcrumb :items="breadcrumbItems" />
          </div>
        </section>

        <!-- Product Gallery & Info -->
        <section class="section">
          <div class="container">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductGallery :product="product" />
              <ProductInfo :product="product" />
            </div>
          </div>
        </section>

        <!-- Product Specifications -->
        <section class="section bg-gray-50">
          <div class="container">
            <ProductSpecs :product="product" />
          </div>
        </section>
      </div>
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
import Button from '@/components/ui/Button.vue'
import ProductGallery from '@/components/product-detail/ProductGallery.vue'
import ProductInfo from '@/components/product-detail/ProductInfo.vue'
import ProductSpecs from '@/components/product-detail/ProductSpecs.vue'

const { t } = useI18n()
const product = ref(null)
const loading = ref(true)

// Get product ID from URL query parameter
const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get('id')

const breadcrumbItems = computed(() => {
  if (!product.value) return []
  return [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products.html' },
    { label: product.value.name, path: null }
  ]
})

onMounted(async () => {
  try {
    const response = await fetch('/data/products.json')
    const products = await response.json()
    product.value = products.find(p => p.slug === productId || p.id === productId)
  } catch (error) {
    console.error('Failed to load product:', error)
  } finally {
    loading.value = false
  }
})
</script>
