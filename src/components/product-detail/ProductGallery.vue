<template>
  <div class="product-gallery">
    <!-- Main Image -->
    <div class="mb-4">
      <img
        :src="currentImage"
        :alt="product.name"
        class="w-full h-96 object-contain bg-gray-50 rounded-lg"
      />
    </div>

    <!-- Thumbnail Images -->
    <div v-if="images.length > 1" class="grid grid-cols-4 gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="currentImage = image"
        :class="['border-2 rounded-lg overflow-hidden transition-all', currentImage === image ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300']"
      >
        <img
          :src="image"
          :alt="`${product.name} view ${index + 1}`"
          class="w-full h-20 object-contain bg-gray-50"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Generate image list (main image + thumbnail)
const images = computed(() => {
  const imageList = [props.product.image]
  if (props.product.thumbnail && props.product.thumbnail !== props.product.image) {
    imageList.push(props.product.thumbnail)
  }
  return imageList
})

const currentImage = ref(images.value[0])
</script>
