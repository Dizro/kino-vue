<template>
  <section class="w-full py-12 sm:py-16 md:py-20">
    <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 md:gap-6">
      <div class="flex-1 rounded-xl bg-gray-900/50 px-4 py-8 opacity-90 shadow-xl sm:py-10">
        <div class="text-2xl font-semibold leading-tight text-slate-100 sm:text-3xl sm:leading-10">
          {{ totalMovies }}
        </div>
        <div class="font-poppins text-sm font-normal leading-normal text-slate-500 sm:text-base">
          фильмов в базе
        </div>
      </div>

      <div class="flex-1 rounded-xl bg-gray-900/50 px-4 py-8 opacity-90 shadow-xl sm:py-10">
        <div class="text-2xl font-semibold leading-tight text-slate-100 sm:text-3xl sm:leading-10">
          {{ genresCount }}
        </div>
        <div class="font-poppins text-sm font-normal leading-normal text-slate-500 sm:text-base">
          жанров фильмов
        </div>
      </div>

      <div class="flex-1 rounded-xl bg-gray-900/50 px-4 py-8 opacity-90 shadow-xl sm:py-10">
        <div class="text-2xl font-semibold leading-tight text-slate-100 sm:text-3xl sm:leading-10">
          {{ favoritesCount }}
        </div>
        <div class="font-poppins text-sm font-normal leading-normal text-slate-500 sm:text-base">
          избранных фильмов
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  totalMovies: {
    type: Number,
    default: 0,
  },
  genresCount: {
    type: Number,
    default: 0,
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
})
</script>
