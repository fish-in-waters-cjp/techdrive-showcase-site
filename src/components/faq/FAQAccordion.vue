<template>
  <div class="faq-accordion space-y-4">
    <div
      v-for="faq in faqs"
      :key="faq.id"
      class="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        @click="toggleFAQ(faq.id)"
        class="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
        :aria-expanded="isOpen(faq.id)"
        :aria-controls="`faq-answer-${faq.id}`"
      >
        <span class="font-semibold text-gray-900 pr-4">{{ faq.question }}</span>
        <svg
          class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform"
          :class="{ 'rotate-180': isOpen(faq.id) }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <Transition name="accordion">
        <div
          v-if="isOpen(faq.id)"
          :id="`faq-answer-${faq.id}`"
          class="px-6 py-4 bg-gray-50 border-t border-gray-200"
        >
          <p class="text-gray-600">{{ faq.answer }}</p>
          <Badge v-if="faq.category" variant="info" size="sm" class="mt-3">
            {{ faq.category }}
          </Badge>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import Badge from '@/components/ui/Badge.vue'

defineProps({
  faqs: {
    type: Array,
    default: () => []
  }
})

const openItems = ref(new Set())

const toggleFAQ = (id) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id)
  } else {
    openItems.value.add(id)
  }
}

const isOpen = (id) => {
  return openItems.value.has(id)
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
