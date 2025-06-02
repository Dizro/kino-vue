<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <div class="max-w-md">
      <h1 class="mb-4 text-6xl font-bold text-violet-500 sm:text-8xl">404</h1>
      <p class="mb-6 text-xl font-semibold text-slate-100 sm:text-2xl">Страница не найдена</p>
      <p class="mb-8 text-slate-400">
        Извините, но страница, которую вы ищете, не существует, была удалена, переименована или
        временно недоступна.
      </p>
      <AppButton @click="returnToHome" variant="primary" size="lg">
        Вернуться на главную
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function returnToHome() {
  router.push('/')
}
</script>
