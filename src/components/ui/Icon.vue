<template>
  <svg
    :class="iconClasses"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-label="ariaLabel"
    :role="ariaLabel ? 'img' : 'presentation'"
  >
    <slot />
  </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 24
  },
  viewBox: {
    type: String,
    default: '0 0 24 24'
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  ariaLabel: {
    type: String,
    default: null
  }
})

const iconClasses = computed(() => {
  return `icon icon-${props.name} inline-block`
})
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
