<template>
  <Card variant="elevated" hoverable>
    <template #image>
      <div class="relative">
        <img
          :src="news.image || '/assets/placeholders/news-placeholder.jpg'"
          :alt="news.title"
          class="w-full h-48 object-cover"
        />
        <Badge
          :variant="categoryVariant"
          class="absolute top-2 right-2"
        >
          {{ categoryLabel }}
        </Badge>
      </div>
    </template>

    <template #header>
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <time :datetime="news.date">{{ formattedDate }}</time>
      </div>
      <h3 class="text-h4 line-clamp-2">{{ news.title }}</h3>
    </template>

    <template #default>
      <p class="text-gray-600 line-clamp-3">{{ news.excerpt }}</p>
    </template>

    <template #footer>
      <a
        :href="news.url"
        class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        {{ $t('mediaNews.readMore') }}
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </template>
  </Card>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'

const { t } = useI18n()
const { formatDate } = useLocale()

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => formatDate(props.news.date, 'long'))

const categoryVariant = computed(() => {
  const variants = {
    'press': 'primary',
    'event': 'success',
    'announcement': 'warning'
  }
  return variants[props.news.category] || 'info'
})

const categoryLabel = computed(() => {
  const labels = {
    'press': t('mediaNews.category.press'),
    'event': t('mediaNews.category.event'),
    'announcement': t('mediaNews.category.announcement')
  }
  return labels[props.news.category] || props.news.category
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
