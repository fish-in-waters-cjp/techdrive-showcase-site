import { computed } from 'vue'
import { useCompareStore } from '@/stores/compare'

export function useCompare() {
  const compareStore = useCompareStore()

  const items = computed(() => compareStore.items)
  const count = computed(() => compareStore.count)
  const canAdd = computed(() => compareStore.canAdd)
  const isFull = computed(() => compareStore.isFull)

  const addItem = (product) => {
    return compareStore.addItem(product)
  }

  const removeItem = (productId) => {
    compareStore.removeItem(productId)
  }

  const clear = () => {
    compareStore.clear()
  }

  const hasItem = (productId) => {
    return compareStore.hasItem(productId)
  }

  const toggleItem = (product) => {
    if (hasItem(product.id)) {
      removeItem(product.id)
      return false
    } else {
      return addItem(product)
    }
  }

  const getComparisonData = () => {
    if (items.value.length < 2) {
      return null
    }

    // Generate comparison table data
    const allSpecs = new Set()
    items.value.forEach(product => {
      product.specs.forEach(spec => allSpecs.add(spec.label))
    })

    const comparison = Array.from(allSpecs).map(specLabel => {
      const row = { label: specLabel }
      items.value.forEach((product, index) => {
        const spec = product.specs.find(s => s.label === specLabel)
        row[`product${index}`] = spec ? spec.value : '-'
      })
      return row
    })

    return {
      products: items.value,
      comparison
    }
  }

  return {
    items,
    count,
    canAdd,
    isFull,
    addItem,
    removeItem,
    clear,
    hasItem,
    toggleItem,
    getComparisonData
  }
}
