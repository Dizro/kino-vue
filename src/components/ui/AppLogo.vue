<template>
  <router-link to="/" aria-label="КиноВью - Главная страница">
    <div class="flex justify-center items-center gap-2">
      <div class="w-[35px] h-[32px]">
        <LogoIcon class="w-full h-full" />
      </div>
      <div
        class="text-slate-100 text-xl sm:text-2xl md:text-3xl font-semibold font-poppins leading-tight"
      >
        КиноВью
      </div>
    </div>
  </router-link>
</template>

<script setup>
import LogoIcon from '../icons/LogoIcon.vue'
</script>
