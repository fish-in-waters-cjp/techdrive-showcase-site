<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'info'
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center font-medium rounded-full'

  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-gray-100 text-gray-800'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  return [base, variants[props.variant], sizes[props.size]].join(' ')
})
</script>
