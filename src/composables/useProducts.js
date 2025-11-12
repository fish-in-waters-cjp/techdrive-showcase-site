import { ref, computed } from 'vue'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/data/products.json')
      if (!response.ok) {
        throw new Error('Failed to load products')
      }
      products.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Error loading products:', err)
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id) => {
    return products.value.find(p => p.id === id || p.slug === id)
  }

  const getProductsByCategory = (category) => {
    if (category === 'all' || !category) {
      return products.value
    }
    return products.value.filter(p => p.category === category)
  }

  const getFeaturedProducts = (limit = 3) => {
    return products.value.filter(p => p.featured).slice(0, limit)
  }

  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase()
    return products.value.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category?.toLowerCase().includes(lowercaseQuery)
    )
  }

  const sortProducts = (sortBy = 'name', order = 'asc') => {
    const sorted = [...products.value].sort((a, b) => {
      if (sortBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      return 0
    })
    return sorted
  }

  const categories = computed(() => {
    const cats = [...new Set(products.value.map(p => p.category).filter(Boolean))]
    return cats.sort()
  })

  return {
    products,
    loading,
    error,
    categories,
    loadProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    sortProducts
  }
}
