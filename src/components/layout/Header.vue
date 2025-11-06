<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="text-2xl font-bold text-gray-900">
            TechDrive
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="/" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.home') }}
          </a>
          <a href="/about.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.about') }}
          </a>
          <a href="/technology.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.technology') }}
          </a>
          <a href="/products.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.products') }}
          </a>
          <a href="/retail-partner.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.retailPartner') }}
          </a>
          <a href="/media-news.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.mediaNews') }}
          </a>
          <a href="/support.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.support') }}
          </a>
          <a href="/contact.html" class="text-gray-700 hover:text-blue-600 transition-colors">
            {{ $t('nav.contact') }}
          </a>

          <!-- Language Switcher -->
          <div class="relative">
            <select
              v-model="currentLocale"
              @change="handleLocaleChange"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Language selector"
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle mobile menu"
          aria-expanded="false"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-200">
        <nav class="flex flex-col space-y-3 pt-4">
          <a href="/" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.home') }}
          </a>
          <a href="/about.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.about') }}
          </a>
          <a href="/technology.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.technology') }}
          </a>
          <a href="/products.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.products') }}
          </a>
          <a href="/retail-partner.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.retailPartner') }}
          </a>
          <a href="/media-news.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.mediaNews') }}
          </a>
          <a href="/support.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.support') }}
          </a>
          <a href="/contact.html" class="text-gray-700 hover:text-blue-600 transition-colors py-2">
            {{ $t('nav.contact') }}
          </a>

          <!-- Mobile Language Switcher -->
          <div class="pt-2">
            <label class="block text-sm text-gray-600 mb-1">{{ $t('nav.language') }}</label>
            <select
              v-model="currentLocale"
              @change="handleLocaleChange"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </nav>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'
import { useUIStore } from '@/stores/ui'

const { locale } = useI18n()
const localeStore = useLocaleStore()
const uiStore = useUIStore()

const currentLocale = computed({
  get: () => localeStore.currentLocale,
  set: (value) => localeStore.setLocale(value)
})

const mobileMenuOpen = computed(() => uiStore.mobileMenuOpen)

const handleLocaleChange = () => {
  locale.value = currentLocale.value
}

const toggleMobileMenu = () => {
  uiStore.toggleMobileMenu()
}
</script>
