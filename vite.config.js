import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        technology: resolve(__dirname, 'technology.html'),
        products: resolve(__dirname, 'products.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        retailPartner: resolve(__dirname, 'retail-partner.html'),
        mediaNews: resolve(__dirname, 'media-news.html'),
        support: resolve(__dirname, 'support.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
})
