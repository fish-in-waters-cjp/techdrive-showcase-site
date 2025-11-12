<template>
  <section class="static-map-section py-16 bg-gray-50">
    <div class="container">
      <h2 class="text-3xl font-bold text-center mb-8">
        {{ $t('contact.location.title') }}
      </h2>

      <div class="max-w-4xl mx-auto">
        <!-- 地圖容器 -->
        <div class="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <!-- 離線模式: 顯示靜態占位圖 -->
          <div v-if="isOffline" class="w-full h-full bg-gray-200 flex items-center justify-center">
            <div class="text-center p-8">
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-gray-600 font-medium">{{ $t('contact.location.offlineMode') }}</p>
              <p class="text-sm text-gray-500 mt-2">{{ $t('contact.location.address') }}</p>
            </div>
          </div>

          <!-- 在線模式: 顯示 Google Maps iFrame -->
          <iframe
            v-else
            :src="mapUrl"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="$t('contact.location.mapTitle')"
          ></iframe>
        </div>

        <!-- 地址資訊與查看按鈕 -->
        <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow">
          <div class="text-center sm:text-left">
            <p class="font-medium text-gray-900">{{ $t('contact.location.company') }}</p>
            <p class="text-gray-600 text-sm mt-1">{{ $t('contact.location.address') }}</p>
          </div>
          <Button
            variant="outline"
            :href="externalMapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-shrink-0"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {{ $t('contact.location.viewOnMap') }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOfflineMode } from '@/composables/useOfflineMode'
import Button from '@/components/ui/Button.vue'

const { t } = useI18n()
const { isOffline, getMapUrl } = useOfflineMode()

// 地圖參數 (可透過 props 傳入自訂)
const props = defineProps({
  lat: {
    type: Number,
    default: 25.033 // 台北市預設座標
  },
  lng: {
    type: Number,
    default: 121.565
  },
  zoom: {
    type: Number,
    default: 15
  }
})

// Google Maps embed URL
const mapUrl = computed(() => getMapUrl({
  lat: props.lat,
  lng: props.lng,
  zoom: props.zoom
}))

// 外部連結 (開啟 Google Maps 新分頁)
const externalMapUrl = computed(() => {
  if (isOffline.value) {
    return '#' // 離線模式返回假連結
  }
  return `https://www.google.com/maps?q=${props.lat},${props.lng}`
})
</script>
