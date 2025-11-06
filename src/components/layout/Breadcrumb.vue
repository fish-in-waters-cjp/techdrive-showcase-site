<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex items-center space-x-2 text-sm">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <a
          v-if="index < items.length - 1"
          :href="item.path"
          class="text-gray-600 hover:text-blue-600 transition-colors"
        >
          {{ item.label }}
        </a>
        <span v-else class="text-gray-900 font-medium">
          {{ item.label }}
        </span>
        <svg
          v-if="index < items.length - 1"
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
    // Example: [{ label: 'Home', path: '/' }, { label: 'Products', path: '/products.html' }, { label: 'TD-100', path: null }]
  }
})
</script>
