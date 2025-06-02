<template>
  <div class="space-y-8 mt-8">
    <h1 class="font-poppins text-3xl font-bold text-slate-100 sm:text-4xl md:text-5xl">
      Избранные фильмы
      <span v-if="myFavoriteMovies.length > 0" class="text-xl text-slate-400">
        ({{ myFavoriteMovies.length }})
      </span>
    </h1>

    <div v-if="myFavoriteMovies.length === 0">
      <StatusMessage
        type="empty"
        title="Список избранного пуст"
        message="Добавляйте фильмы в избранное, нажимая на сердечко на карточке фильма или на его странице."
      >
        <template #actions>
          <AppButton @click="goToCatalog" variant="primary" size="md">
            Перейти в каталог
          </AppButton>
        </template>
      </StatusMessage>
    </div>

    <div
      v-else
      class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCard v-for="movie in myFavoriteMovies" :key="'favorite-' + movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/store/movies'
import MovieCard from '@/components/ui/MovieCard.vue'
import StatusMessage from '@/components/ui/StatusMessage.vue'
import AppButton from '@/components/ui/AppButton.vue'

const movieStore = useMoviesStore()
const router = useRouter()

const myFavoriteMovies = computed(function () {
  return movieStore.favorites
})

function goToCatalog() {
  router.push('/movies')
}
</script>
