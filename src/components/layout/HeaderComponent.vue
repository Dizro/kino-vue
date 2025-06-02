<template>
  <header
    class="fixed left-0 top-0 z-50 w-full bg-gray-900/80 px-4 py-3 sm:px-6 md:px-10 lg:px-desktop-x"
  >
    <div class="mx-auto flex max-w-screen-desktop items-center justify-between">
      <AppLogo />
      <AppNavigation class="hidden md:flex" />

      <button
        @click="toggleMobileMenu"
        class="rounded-md p-2 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 md:hidden"
      >
        <span class="sr-only">{{ isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню' }}</span>
        <MenuIcon v-if="!isMobileMenuOpen" class="h-6 w-6" />
        <CloseIcon v-else class="h-6 w-6" />
      </button>
    </div>

    <transition>
      <div v-show="isMobileMenuOpen" class="border-t border-slate-700/50 bg-gray-900/95 md:hidden">
        <div class="main-container pb-3 pt-2">
          <AppNavigation is-mobile @link-clicked="closeMobileMenu" />
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLogo from '../ui/AppLogo.vue'
import AppNavigation from '../ui/AppNavigation.vue'
import MenuIcon from '../icons/MenuIcon.vue'
import CloseIcon from '../icons/CloseIcon.vue'

const isMobileMenuOpen = ref(false)
const route = useRoute()

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

watch(
  function () {
    return route.path
  },
  function () {
    closeMobileMenu()
  }
)
</script>
