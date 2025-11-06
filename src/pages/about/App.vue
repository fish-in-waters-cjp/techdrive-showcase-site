<template>
  <div class="about-page">
    <Header />

    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-brand text-white py-20">
        <div class="container">
          <Breadcrumb :items="breadcrumbItems" class="mb-8 text-white" />
          <h1 class="text-h1 mb-4">{{ $t('about.title') }}</h1>
          <p class="text-xl max-w-2xl">{{ $t('about.subtitle') }}</p>
        </div>
      </section>

      <!-- Company History Section -->
      <CompanyHistorySection />

      <!-- Value Proposition Section -->
      <ValuePropositionSection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import CompanyHistorySection from '@/components/sections/CompanyHistorySection.vue'
import ValuePropositionSection from '@/components/sections/ValuePropositionSection.vue'

const { t } = useI18n()

const breadcrumbItems = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.about'), path: null }
])
</script>
