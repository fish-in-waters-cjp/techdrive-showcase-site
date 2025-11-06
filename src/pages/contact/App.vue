<template>
  <div class="contact-page">
    <Header />

    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-brand text-white py-20">
        <div class="container">
          <Breadcrumb :items="breadcrumbItems" class="mb-8 text-white" />
          <h1 class="text-h1 mb-4">{{ $t('contact.title') }}</h1>
          <p class="text-xl max-w-2xl">{{ $t('contact.subtitle') }}</p>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section class="section">
        <div class="container max-w-4xl">
          <ContactForm />
        </div>
      </section>

      <!-- Contact Info -->
      <section class="section bg-gray-50">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 class="text-h4 mb-2">{{ $t('contact.email') }}</h3>
                <p class="text-gray-600">support@techdrive.com</p>
              </div>
            </Card>
            <Card variant="elevated">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 class="text-h4 mb-2">{{ $t('contact.phone') }}</h3>
                <p class="text-gray-600">+886-2-1234-5678</p>
              </div>
            </Card>
            <Card variant="elevated">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-h4 mb-2">{{ $t('contact.hours') }}</h3>
                <p class="text-gray-600">週一至週五 09:00-18:00</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
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
import Card from '@/components/ui/Card.vue'
import ContactForm from '@/components/forms/ContactForm.vue'

const { t } = useI18n()

const breadcrumbItems = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.contact'), path: null }
])
</script>
