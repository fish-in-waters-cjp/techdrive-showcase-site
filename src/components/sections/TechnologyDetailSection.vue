<template>
  <section class="technology-detail-section section">
    <div class="container">
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-500">{{ $t('common.loading') }}</p>
      </div>

      <div v-else class="space-y-16">
        <div
          v-for="(tech, index) in technologies"
          :key="tech.key"
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          :class="index % 2 === 1 ? 'lg:grid-flow-dense' : ''"
        >
          <!-- Image -->
          <div :class="index % 2 === 1 ? 'lg:col-start-2' : ''">
            <div class="bg-blue-50 rounded-lg p-12 flex items-center justify-center">
              <img
                :src="tech.icon"
                :alt="`${tech.title} icon`"
                class="w-48 h-48 object-contain"
              />
            </div>
          </div>

          <!-- Content -->
          <div :class="index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''">
            <h2 class="text-h2 mb-4">{{ tech.title }}</h2>
            <p class="text-xl text-blue-600 mb-4">{{ tech.summary }}</p>
            <p class="text-gray-600 mb-6">{{ tech.description }}</p>

            <h3 class="text-h4 mb-4">{{ $t('technology.benefits') }}</h3>
            <ul class="space-y-3">
              <li
                v-for="(benefit, benefitIndex) in tech.benefits"
                :key="benefitIndex"
                class="flex items-start"
              >
                <svg class="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const technologies = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/data/technologies.json')
    const data = await response.json()
    technologies.value = data
  } catch (error) {
    console.error('Failed to load technologies:', error)
  } finally {
    loading.value = false
  }
})
</script>
