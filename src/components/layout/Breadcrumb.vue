<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex items-center space-x-2 text-sm">
      <li v-for="(item, index) in processedItems" :key="index" class="flex items-center">
        <a
          v-if="index < processedItems.length - 1"
          :href="item.path"
          class="text-gray-300 hover:text-blue-600 transition-colors"
        >
          {{ item.label }}
        </a>
        <span v-else class="text-gray-200 font-medium">
          {{ item.label }}
        </span>
        <svg
          v-if="index < processedItems.length - 1"
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useBasePath } from '@/composables/useBasePath'

const { getUrl } = useBasePath()

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // Example: [{ label: 'Home', path: '/' }, { label: 'Products', path: '/products.html' }, { label: 'TD-100', path: null }]
  },
});

// Process breadcrumb items to add base path
const processedItems = computed(() => {
  return props.items.map(item => {
    if (!item.path) return item

    // If it's an external link, return as-is
    if (item.path.startsWith('http://') || item.path.startsWith('https://') || item.path.startsWith('#')) {
      return item
    }

    // Otherwise, it's an internal link - add base path
    return {
      ...item,
      path: getUrl(item.path)
    }
  })
})
</script>
