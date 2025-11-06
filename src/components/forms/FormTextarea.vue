<template>
  <div class="form-textarea">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <Field
      :id="name"
      :name="name"
      as="textarea"
      v-model="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
      :class="{ 'border-red-500': errorMessage }"
    />
    <ErrorMessage :name="name" class="text-sm text-red-600 mt-1" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { defineProps, defineEmits } from 'vue'

defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  modelValue: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
