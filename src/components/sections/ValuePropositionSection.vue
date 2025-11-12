<template>
  <section class="value-proposition-section section bg-gray-50">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="text-h2 mb-4">{{ $t('about.values.title') }}</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ $t('about.values.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="(value, index) in values"
          :key="index"
          variant="elevated"
          class="text-center"
        >
          <div class="flex flex-col items-center">
            <!-- Icon -->
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon" />
              </svg>
            </div>

            <!-- Content -->
            <h3 class="text-h4 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/Card.vue'

const { t } = useI18n()

const values = ref([
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', // Check circle icon
    title: t('about.values.value1.title'),
    description: t('about.values.value1.description')
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Lightning bolt icon
    title: t('about.values.value2.title'),
    description: t('about.values.value2.description')
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', // Users icon
    title: t('about.values.value3.title'),
    description: t('about.values.value3.description')
  }
])
</script>
