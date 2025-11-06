<template>
  <div class="home-page">
    <Header />

    <main>
      <!-- Hero Section -->
      <HeroSection />

      <!-- Core Technology Section -->
      <CoreTechSection />

      <!-- Featured Products Section -->
      <FeaturedProductsSection />

      <!-- Retail Partner Section -->
      <RetailPartnerSection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import CoreTechSection from '@/components/sections/CoreTechSection.vue'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection.vue'
import RetailPartnerSection from '@/components/sections/RetailPartnerSection.vue'
</script>
