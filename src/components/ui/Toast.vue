<template>
  <Transition name="toast">
    <div
      v-if="visible"
      :class="toastClasses"
      class="fixed bottom-8 right-8 z-50 max-w-md px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in"
      role="alert"
      :aria-live="type === 'error' ? 'assertive' : 'polite'"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg
          v-if="type === 'success'"
          class="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg
          v-else-if="type === 'error'"
          class="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          class="w-6 h-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <svg
          v-else
          class="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- Message -->
      <div class="flex-1">
        <p class="font-medium text-gray-900">{{ message }}</p>
      </div>

      <!-- Close Button -->
      <button
        v-if="closable"
        @click="close"
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        :aria-label="$t('common.close')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  type: {
    type: String,
    default: 'info', // 'success' | 'error' | 'warning' | 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000 // 3 秒後自動關閉
  },
  closable: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const visible = ref(props.modelValue)
let timer = null

const toastClasses = {
  success: 'bg-green-50 border-l-4 border-green-500',
  error: 'bg-red-50 border-l-4 border-red-500',
  warning: 'bg-yellow-50 border-l-4 border-yellow-500',
  info: 'bg-blue-50 border-l-4 border-blue-500'
}[props.type]

function close() {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
  if (timer) clearTimeout(timer)
}

watch(() => props.modelValue, (newValue) => {
  visible.value = newValue
  if (newValue && props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
})

onMounted(() => {
  if (visible.value && props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
