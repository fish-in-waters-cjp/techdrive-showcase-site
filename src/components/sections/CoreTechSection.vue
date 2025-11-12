<template>
  <section class="core-tech-section section bg-gray-50">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="text-h2 mb-4">{{ $t('coreTech.title') }}</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ $t('coreTech.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="tech in technologies"
          :key="tech.key"
          variant="elevated"
          hoverable
          class="text-center"
        >
          <template #image>
            <div class="flex items-center justify-center h-32 bg-blue-50">
              <img
                :src="tech.icon"
                :alt="`${tech.title} icon`"
                class="w-20 h-20 object-contain"
              />
            </div>
          </template>

          <template #header>
            <h3 class="text-h4">{{ tech.title }}</h3>
          </template>

          <template #default>
            <p class="text-gray-600 mb-4">{{ tech.summary }}</p>
          </template>

          <template #footer>
            <Button
              variant="ghost"
              href="/technology.html"
              class="w-full"
            >
              {{ $t('coreTech.learnMore') }}
            </Button>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
const technologies = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/data/technologies.json')
    const data = await response.json()
    technologies.value = data.slice(0, 3) // 只顯示 3 個核心技術
  } catch (error) {
    console.error('Failed to load technologies:', error)
  }
})
</script>
