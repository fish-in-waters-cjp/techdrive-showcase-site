<template>
  <section class="company-history-section section">
    <div class="container">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-h2 mb-12 text-center">{{ $t('about.history.title') }}</h2>

        <!-- Timeline -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 md:left-1/2 md:transform md:-translate-x-1/2"></div>

          <!-- Timeline Items -->
          <div class="space-y-12">
            <div
              v-for="(milestone, index) in milestones"
              :key="index"
              class="relative pl-20 md:pl-0"
              :class="index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'"
            >
              <!-- Timeline Dot -->
              <div class="absolute left-6 w-4 h-4 bg-blue-600 rounded-full md:left-1/2 md:transform md:-translate-x-1/2"></div>

              <!-- Content -->
              <Card variant="elevated" :class="index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0">
                    <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {{ milestone.year }}
                    </span>
                  </div>
                  <div>
                    <h3 class="text-h4 mb-2">{{ milestone.title }}</h3>
                    <p class="text-gray-600">{{ milestone.description }}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/Card.vue'

const { t } = useI18n()

const milestones = ref([
  {
    year: '2015',
    title: t('about.history.milestone1.title'),
    description: t('about.history.milestone1.description')
  },
  {
    year: '2017',
    title: t('about.history.milestone2.title'),
    description: t('about.history.milestone2.description')
  },
  {
    year: '2019',
    title: t('about.history.milestone3.title'),
    description: t('about.history.milestone3.description')
  },
  {
    year: '2021',
    title: t('about.history.milestone4.title'),
    description: t('about.history.milestone4.description')
  },
  {
    year: '2023',
    title: t('about.history.milestone5.title'),
    description: t('about.history.milestone5.description')
  }
])
</script>
