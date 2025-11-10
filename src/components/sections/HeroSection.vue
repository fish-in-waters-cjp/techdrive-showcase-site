<template>
  <section class="hero-section relative bg-gray-900 text-white overflow-hidden">
    <!-- Background Image (使用 picsum.photos 占位圖) -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70 z-10"></div>
      <img
        src="https://picsum.photos/1920/1080?random=1"
        alt="TechDrive Hero Background"
        class="w-full h-full object-cover"
        loading="eager"
      />
    </div>

    <!-- Content -->
    <div class="container relative z-20 py-32 md:py-40">
      <div class="max-w-3xl animate-slide-up">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 text-balance">
          {{ $t('hero.title') }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-gray-200">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            href="/products.html"
          >
            {{ $t('hero.cta.primary') }}
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/about.html"
            class="border-white text-white hover:bg-white hover:text-gray-900"
          >
            {{ $t('hero.cta.secondary') }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
</script>
