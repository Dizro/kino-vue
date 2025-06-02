<template>
  <div class="flex-grow text-slate-100 md:ml-8">
    <div class="mb-4 flex items-start justify-between">
      <h1 class="text-3xl font-bold font-poppins text-slate-50 md:text-4xl">
        {{ movie.title }}
        <span v-if="movie.year" class="text-2xl font-normal text-slate-400">
          ({{ movie.year }})</span
        >
      </h1>
      <AppButton
        variant="text"
        size="sm"
        @click="$emit('toggleFavorite')"
        :class="
          isFavorite
            ? 'text-violet-500 hover:text-violet-300'
            : 'text-blue-500 hover:text-violet-400'
        "
        class="p-1"
      >
        <FavoriteIcon :is-filled="isFavorite" class="h-7 w-7 sm:h-8 sm:w-8" />
      </AppButton>
    </div>

    <RatingDisplay v-if="movie.voteAverage > 0" :rating="movie.voteAverage" class="mb-4 text-lg" />

    <div v-if="movie.genres && movie.genres.length" class="mb-6">
      <h3 class="mb-2 text-lg font-semibold text-slate-300">Жанры:</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(genre, index) in movie.genres"
          :key="index"
          class="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300"
        >
          {{ genre }}
        </span>
      </div>
    </div>

    <div v-if="movie.overview" class="mb-6">
      <h3 class="mb-2 text-xl font-semibold text-slate-300 font-poppins">Описание:</h3>
      <p class="text-base leading-relaxed text-slate-300 font-montserrat">
        {{ movie.overview }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
      <div v-if="movie.runtime">
        <strong class="text-slate-400">Длительность:</strong> {{ movie.runtime }} мин.
      </div>
      <div v-if="movie.releaseDate && movie.releaseDate !== 'N/A'">
        <strong class="text-slate-400">Дата выхода:</strong>
        {{ getFormattedReleaseDate(movie.releaseDate) }}
      </div>
      <div v-if="movie.countries && movie.countries.length">
        <strong class="text-slate-400">Страны:</strong> {{ movie.countries.join(', ') }}
      </div>
    </div>

    <div v-if="movie.cast && movie.cast.length" class="mt-8">
      <h3 class="mb-4 text-xl font-semibold text-slate-300 font-poppins">В ролях:</h3>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <div
          v-for="actor in movie.cast.slice(0, 10)"
          :key="actor.id"
          class="flex flex-col items-center text-center"
        >
          <ImagePlaceholder
            v-if="!actor.profilePath"
            text="Нет фото"
            class="h-24 w-24 rounded-full sm:h-28 sm:w-28 bg-slate-700"
          />
          <img
            v-else
            :src="actor.profilePath"
            :alt="actor.name"
            class="h-24 w-24 rounded-full object-cover shadow-md sm:h-28 sm:w-28"
            loading="lazy"
          />
          <p class="mt-2 text-xs font-medium text-slate-200 sm:text-sm">{{ actor.name }}</p>
          <p v-if="actor.character" class="text-xxs text-slate-400 sm:text-xs">
            {{ actor.character }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '../ui/AppButton.vue'
import RatingDisplay from '../ui/RatingDisplay.vue'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'
import FavoriteIcon from '../icons/FavoriteIcon.vue'

defineProps({
  movie: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['toggleFavorite'])

function getFormattedReleaseDate(dateString) {
  if (!dateString || dateString === 'N/A') {
    return 'Неизвестно'
  }
  const dateObject = new Date(dateString)
  if (isNaN(dateObject.getFullYear()) || dateObject.getFullYear() < 1900) {
    return dateString
  }
  const day = dateObject.getDate()
  const month = dateObject.toLocaleString('ru-RU', { month: 'long' })
  const year = dateObject.getFullYear()
  return day + ' ' + month + ' ' + year
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
  line-height: 0.85rem;
}
</style>
