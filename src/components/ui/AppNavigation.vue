<template>
  <nav
    :class="isMobile ? 'flex flex-col space-y-1 py-2' : 'flex items-center gap-1 sm:gap-2 lg:gap-4'"
  >
    <router-link
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      :class="[
        'text-base font-semibold leading-normal tracking-tight transition-colors duration-150 ease-in-out rounded-md font-montserrat',
        isMobile
          ? 'block px-3 py-3 text-slate-300 hover:bg-slate-700 hover:text-white'
          : 'px-3 py-2 lg:px-4 text-gray-400 hover:text-white focus:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500',
      ]"
      active-class="!text-violet-500"
      @click="onLinkClicked"
    >
      {{ link.text }}
    </router-link>
  </nav>
</template>

<script setup>
defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['linkClicked'])

const navLinks = [
  { text: 'Главная', to: '/' },
  { text: 'Каталог', to: '/movies' },
  { text: 'Избранное', to: '/favorites' },
  { text: 'Обратная связь', to: '/stats-form' },
]

function onLinkClicked() {
  emit('linkClicked')
}
</script>
