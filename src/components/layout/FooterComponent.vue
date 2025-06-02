<template>
  <footer class="bg-gray-900/50 py-8 text-center text-slate-500">
    <div class="main-container">
      <p class="text-sm">© {{ currentYear }} КиноВью. Курсовой проект.</p>
      <p class="text-xs mt-1">Автор: Дубина Дмитрий</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
