<template>
  <section
    class="relative flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden rounded-3xl"
  >
    <div class="relative z-10 max-w-3xl px-4">
      <AppLogo
        class="mb-8 justify-center [&>div>div]:text-4xl [&>div>div]:sm:text-5xl [&>div>div]:lg:text-6xl"
      />
      <h1
        class="mb-8 mt-8 font-montserrat text-lg font-normal leading-relaxed text-slate-300 sm:text-xl md:text-2xl"
      >
        Ваш персональный кинотеатр для погружения в мир любимых фильмов и сериалов, разработанный в
        рамках курсового проекта на Vue.js 😉
      </h1>
      <QuickSearchInput @search-triggered="handleQuickSearch" />
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppLogo from '../ui/AppLogo.vue'
import QuickSearchInput from './QuickSearchInput.vue'

const router = useRouter()

function handleQuickSearch(query) {
  const trimmedQuery = query.trim()
  if (trimmedQuery !== '') {
    router.push({ path: '/movies', query: { searchQuery: trimmedQuery } })
  }
}
</script>
