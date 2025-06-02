<template>
  <div
    class="Card group relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-slate-800 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-violet-400/50 hover:scale-[1.02]"
    role="article"
  >
    <div class="card-content flex h-full flex-col justify-start gap-4 px-2 pt-2 pb-4">
      <router-link
        :to="movieLink(movie.id)"
        class="block w-full aspect-[2/3] relative overflow-hidden rounded-lg group-hover:shadow-lg transition-shadow duration-300"
      >
        <ImagePlaceholder v-if="!movie.posterPath" text="Нет постера" class="bg-slate-600" />
        <img
          v-else
          :src="movie.posterPath"
          :alt="altForMoviePoster(movie.title)"
          class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        <div
          v-if="movie.voteAverage > 0"
          class="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 shadow-lg border border-white/10"
        >
          <div class="relative h-4 w-4 star-icon-wrapper">
            <StarIcon class="h-full w-full" />
          </div>
          <span class="font-poppins text-sm font-semibold text-white drop-shadow-sm">
            {{ movie.voteAverage.toFixed(1) }}
          </span>
        </div>
      </router-link>

      <div class="info-section flex flex-col justify-between self-stretch p-2 h-32">
        <div class="title-year-container flex-1">
          <router-link :to="movieLink(movie.id)">
            <h3
              class="line-clamp-2 font-poppins text-base font-semibold leading-tight tracking-tight text-slate-100 transition-colors hover:text-violet-300 group-hover:text-violet-200 mb-1"
            >
              {{ movie.title }}
            </h3>
          </router-link>
          <p class="font-poppins text-base font-normal leading-normal text-slate-500">
            {{ getMovieYear(movie) }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <AppButton
            variant="primary"
            size="sm"
            custom-class="!px-6 !py-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 shadow-lg hover:shadow-xl transition-all duration-200"
            @click="navigateToMovieDetails(movie.id)"
          >
            Подробнее
          </AppButton>

          <AppButton
            variant="text"
            size="sm"
            @click.stop="toggleFavoriteMovie"
            class="p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-0 focus:shadow-none"
            :class="isFav ? 'text-red-500 hover:text-red-400' : 'text-slate-400 hover:text-red-400'"
          >
            <FavoriteIcon
              :is-filled="isFav"
              class="h-6 w-6 transition-transform duration-200 hover:scale-110"
            />
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '../../store/movies'
import AppButton from './AppButton.vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
import FavoriteIcon from '../icons/FavoriteIcon.vue'
import StarIcon from '../icons/StarIcon.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const store = useMoviesStore()
const router = useRouter()

const isFav = computed(function () {
  return store.isFavorite(props.movie.id)
})

function toggleFavoriteMovie() {
  store.toggleFavorite(props.movie)
}

function movieLink(id) {
  return '/movie/' + id
}

function navigateToMovieDetails(id) {
  router.push(movieLink(id))
}

function getMovieYear(movie) {
  if (movie.year) {
    return movie.year
  }
  if (movie.releaseDate && movie.releaseDate !== 'N/A') {
    return new Date(movie.releaseDate).getFullYear()
  }
  return '----'
}

function altForMoviePoster(title) {
  return 'Постер фильма ' + title
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.Card:hover .line-clamp-2 {
  color: theme('colors.violet.200');
}
</style>
