<template>
  <div :class="cardClasses">
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>

    <div :class="contentClasses">
      <div v-if="$slots.header" class="card-header">
        <slot name="header" />
      </div>

      <div v-if="$slots.default" class="card-body">
        <slot />
      </div>

      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default' | 'elevated' | 'outlined'
    validator: (value) => ['default', 'elevated', 'outlined'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg' | 'none'
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  }
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg overflow-hidden transition-all duration-200'

  const variants = {
    default: 'border border-gray-200',
    elevated: 'shadow-md',
    outlined: 'border-2 border-gray-300'
  }

  const hover = props.hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''

  return [base, variants[props.variant], hover].join(' ')
})

const contentClasses = computed(() => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }

  return paddings[props.padding]
})
</script>

<style scoped>
.card-header {
  @apply mb-4;
}

.card-body {
  @apply text-gray-600;
}

.card-footer {
  @apply mt-4 pt-4 border-t border-gray-200;
}
</style>
