<template>
  <section class="retail-partner-section section bg-gray-50">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="text-h2 mb-4">{{ $t('retailers.title') }}</h2>
        <p class="text-xl text-gray-600">
          {{ $t('retailers.subtitle') }}
        </p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-500">{{ $t('common.loading') }}</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
        <div
          v-for="retailer in retailers"
          :key="retailer.id"
          class="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            :src="retailer.logo"
            :alt="`${retailer.name} logo`"
            class="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
          />
        </div>
      </div>

      <div class="text-center mt-12">
        <Button variant="outline" href="/retail-partner.html">
          {{ $t('retailers.becomePartner') }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
const retailers = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/data/retailers.json')
    const data = await response.json()
    retailers.value = data
  } catch (error) {
    console.error('Failed to load retailers:', error)
  } finally {
    loading.value = false
  }
})
</script>
