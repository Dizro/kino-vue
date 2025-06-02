<template>
  <div class="min-h-screen flex flex-col bg-gray-900">
    <HeaderComponent />
    <main class="main-container flex-grow pt-desktop-y-main-pt pb-desktop-y-main-pb relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style>
