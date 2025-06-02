<template>
  <div class="w-full space-y-12 sm:space-y-16 md:space-y-20">
    <HomeGreeting />

    <section>
      <div class="mb-6 flex items-center justify-between sm:mb-8">
        <h2 class="font-poppins text-2xl font-semibold text-slate-100 sm:text-3xl">Рекомендации</h2>
        <router-link
          to="/movies?sort=votes.kp|-1"
          class="font-montserrat text-sm text-slate-400 transition-colors hover:text-violet-300 sm:text-base"
        >
          Смотреть все
        </router-link>
      </div>
      <div
        v-if="movieStore.isLoading && popularMoviesToShow.length === 0"
        class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
      >
        <MovieCardPlaceholder v-for="n in 4" :key="'placeholder-popular-' + n" />
      </div>
      <div
        v-else-if="popularMoviesToShow.length > 0"
        class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
      >
        <MovieCard
          v-for="movie in popularMoviesToShow"
          :key="'popular-' + movie.id"
          :movie="movie"
        />
      </div>
      <StatusMessage
        v-else-if="!movieStore.isLoading"
        type="empty"
        title="Нет рекомендаций"
        message="Пока что мы не можем ничего порекомендовать. Загляните позже!"
      />
    </section>

    <section>
      <div class="mb-6 flex items-center justify-between sm:mb-8">
        <h2 class="font-poppins text-2xl font-semibold text-slate-100 sm:text-3xl">
          Лучшие по рейтингу
        </h2>
        <router-link
          to="/movies?sort=rating.kp|-1&rating.kp=7.5-10"
          class="font-montserrat text-sm text-slate-400 transition-colors hover:text-violet-300 sm:text-base"
        >
          Смотреть все
        </router-link>
      </div>
      <div
        v-if="movieStore.isLoading && topRatedMoviesToShow.length === 0"
        class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
      >
        <MovieCardPlaceholder v-for="n in 4" :key="'placeholder-top-' + n" />
      </div>
      <div
        v-else-if="topRatedMoviesToShow.length > 0"
        class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
      >
        <MovieCard
          v-for="movie in topRatedMoviesToShow"
          :key="'toprated-' + movie.id"
          :movie="movie"
        />
      </div>
      <StatusMessage
        v-else-if="!movieStore.isLoading"
        type="empty"
        title="Нет фильмов"
        message="Фильмы с высоким рейтингом скоро появятся здесь."
      />
    </section>

    <HomeStatsDisplay
      :total-movies="movieStore.totalResults"
      :genres-count="movieStore.genres.length"
      :favorites-count="movieStore.favorites.length"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useMoviesStore } from '@/store/movies'
import HomeGreeting from '@/components/home/HomeGreeting.vue'
import HomeStatsDisplay from '@/components/home/HomeStatsDisplay.vue'
import MovieCard from '@/components/ui/MovieCard.vue'
import StatusMessage from '@/components/ui/StatusMessage.vue'
import MovieCardPlaceholder from '@/components/ui/MovieCardPlaceholder.vue'

const movieStore = useMoviesStore()

const popularMoviesToShow = computed(function () {
  return movieStore.popularMoviesHome
})
const topRatedMoviesToShow = computed(function () {
  return movieStore.topRatedMoviesHome
})

onMounted(async function () {
  if (movieStore.popularMoviesHome.length === 0) {
    await movieStore.fetchPopularMoviesForHome(4)
  }
  if (movieStore.topRatedMoviesHome.length === 0) {
    await movieStore.fetchTopRatedMoviesForHome(4)
  }
  if (movieStore.genres.length === 0) {
    await movieStore.loadGenres()
  }
  if (movieStore.totalResults === 0 && movieStore.movies.length === 0) {
    await movieStore.loadMovies({ page: 1, limit: 1 })
  }
})
</script>
