<template>
  <div class="support-page">
    <Header />

    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-brand text-white py-20">
        <div class="container">
          <Breadcrumb :items="breadcrumbItems" class="mb-8 text-white" />
          <h1 class="text-h1 mb-4">{{ $t('support.title') }}</h1>
          <p class="text-xl max-w-2xl">{{ $t('support.subtitle') }}</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="section">
        <div class="container max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-h2 mb-4">{{ $t('support.faq.title') }}</h2>
            <p class="text-xl text-gray-600">{{ $t('support.faq.subtitle') }}</p>
          </div>

          <div v-if="loading" class="text-center py-12">
            <p class="text-gray-500">{{ $t('common.loading') }}</p>
          </div>

          <FAQAccordion v-else :faqs="faqs" />
        </div>
      </section>

      <!-- Contact Support Section -->
      <section class="section bg-gray-50">
        <div class="container">
          <div class="text-center mb-12">
            <h2 class="text-h2 mb-4">{{ $t('support.contact.title') }}</h2>
            <p class="text-xl text-gray-600">{{ $t('support.contact.subtitle') }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card variant="elevated">
              <div class="flex items-start gap-4">
                <svg class="w-12 h-12 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 class="text-h4 mb-2">{{ $t('support.contact.email') }}</h3>
                  <p class="text-gray-600 mb-2">support@techdrive.com</p>
                  <p class="text-sm text-gray-500">{{ $t('support.contact.emailHours') }}</p>
                </div>
              </div>
            </Card>

            <Card variant="elevated">
              <div class="flex items-start gap-4">
                <svg class="w-12 h-12 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 class="text-h4 mb-2">{{ $t('support.contact.phone') }}</h3>
                  <p class="text-gray-600 mb-2">+886-2-1234-5678</p>
                  <p class="text-sm text-gray-500">{{ $t('support.contact.phoneHours') }}</p>
                </div>
              </div>
            </Card>
          </div>

          <div class="text-center mt-8">
            <Button variant="primary" size="lg" href="/contact.html">
              {{ $t('support.contact.button') }}
            </Button>
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
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import FAQAccordion from '@/components/faq/FAQAccordion.vue'

const { t } = useI18n()
const faqs = ref([])
const loading = ref(true)

const breadcrumbItems = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.support'), path: null }
])

onMounted(async () => {
  try {
    const response = await fetch('/data/faqs.json')
    const data = await response.json()
    faqs.value = data.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Failed to load FAQs:', error)
  } finally {
    loading.value = false
  }
})
</script>
