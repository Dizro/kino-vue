<template>
  <div>
    <AppButton @click="goBackToPreviousPage" variant="outline-blue" size="sm" class="mb-6">
      <BackArrowIcon class="w-5 h-5 mr-2" />
      Назад
    </AppButton>

    <LoadingSpinner v-if="movieStore.isLoading && !movieData" />

    <StatusMessage
      v-else-if="movieStore.hasError && !movieData"
      type="error"
      title="Ошибка загрузки"
      :message="movieStore.error"
    />

    <article
      v-else-if="movieData"
      class="space-y-8 md:space-y-12"
      itemscope
      itemtype="http://schema.org/Movie"
    >
      <div
        v-if="movieData.backdropPath"
        class="relative -mx-4 h-[300px] overflow-hidden rounded-b-2xl shadow-lg sm:-mx-6 md:-mx-10 lg:-mx-desktop-x md:h-[400px] lg:h-[480px]"
      >
        <img
          :src="movieData.backdropPath"
          :alt="movieData.title + ' фон'"
          class="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"
        ></div>
      </div>
      <div v-else class="h-16"></div>
      <div
        class="main-container -mt-[150px] md:-mt-[200px] lg:-mt-[240px] relative z-10 flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10"
      >
        <div class="mx-auto w-2/3 flex-shrink-0 sm:w-1/2 md:mx-0 md:w-[280px] lg:w-[320px]">
          <ImagePlaceholder
            v-if="!movieData.posterPath"
            text="Нет постера"
            class="aspect-[2/3] bg-slate-700"
          />
          <img
            v-else
            :src="movieData.posterPath"
            :alt="movieData.title + ' постер'"
            class="w-full rounded-xl object-cover shadow-2xl aspect-[2/3]"
            loading="lazy"
            itemprop="image"
          />
        </div>

        <MovieInfoBlock
          :movie="movieData"
          :is-favorite="isCurrentMovieFavorite"
          @toggle-favorite="toggleCurrentMovieFavorite"
        />
      </div>
    </article>

    <StatusMessage
      v-else-if="!movieStore.isLoading"
      type="empty"
      title="Фильм не найден"
      message="К сожалению, информация о данном фильме отсутствует."
    >
      <template #actions>
        <AppButton @click="goToHomePage" variant="primary">На главную</AppButton>
      </template>
    </StatusMessage>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '@/store/movies'
import MovieInfoBlock from '@/components/movies/MovieInfoBlock.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import StatusMessage from '@/components/ui/StatusMessage.vue'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import AppButton from '@/components/ui/AppButton.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMoviesStore()

const movieData = computed(function () {
  return movieStore.currentMovie
})

const isCurrentMovieFavorite = computed(function () {
  if (movieData.value) {
    return movieStore.isFavorite(movieData.value.id)
  }
  return false
})

function toggleCurrentMovieFavorite() {
  if (movieData.value) {
    movieStore.toggleFavorite(movieData.value)
  }
}

async function loadMovieInformation() {
  const movieIdFromRoute = Number(route.params.id)
  if (isNaN(movieIdFromRoute)) {
    router.push({ name: 'Не найдено' })
    return
  }
  await movieStore.loadMovieDetail(movieIdFromRoute)

  if (movieData.value) {
    let titleYearPart = ''
    if (movieData.value.year) {
      titleYearPart = ' (' + movieData.value.year + ')'
    }
    document.title = movieData.value.title + titleYearPart + ' - КиноВью'
  } else if (!movieStore.isLoading) {
    document.title = 'Фильм не найден - КиноВью'
  }
}

onMounted(loadMovieInformation)

watch(
  function () {
    return route.params.id
  },
  function (newId) {
    if (newId && route.name === 'Детали фильма') {
      loadMovieInformation()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)

function goBackToPreviousPage() {
  router.back()
}

function goToHomePage() {
  router.push('/')
}
</script>
