<template>
  <div class="media-news-page">
    <Header />

    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-brand text-white py-20">
        <div class="container">
          <Breadcrumb :items="breadcrumbItems" class="mb-8 text-white" />
          <h1 class="text-h1 mb-4">{{ $t('mediaNews.title') }}</h1>
          <p class="text-xl max-w-2xl">{{ $t('mediaNews.subtitle') }}</p>
        </div>
      </section>

      <!-- News List Section -->
      <section class="section">
        <div class="container">
          <div v-if="loading" class="text-center py-12">
            <p class="text-gray-500">{{ $t('common.loading') }}</p>
          </div>

          <div v-else-if="news.length === 0" class="text-center py-12">
            <p class="text-gray-500">{{ $t('mediaNews.noNews') }}</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsCard
              v-for="item in news"
              :key="item.id"
              :news="item"
            />
          </div>
        </div>
      </section>
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
import NewsCard from '@/components/news/NewsCard.vue'

const { t } = useI18n()
const news = ref([])
const loading = ref(true)

const breadcrumbItems = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.mediaNews'), path: null }
])

onMounted(async () => {
  try {
    const response = await fetch('/data/news.json')
    const data = await response.json()
    news.value = data.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Failed to load news:', error)
  } finally {
    loading.value = false
  }
})
</script>
