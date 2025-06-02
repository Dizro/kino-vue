<template>
  <div class="space-y-8 mt-8">
    <h1 class="font-poppins text-3xl font-bold text-slate-100 sm:text-4xl md:text-5xl">
      Каталог фильмов
    </h1>

    <div class="space-y-4 rounded-xl bg-gray-900/50 p-4 shadow-lg sm:p-6">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AppInput
          v-model="searchQueryValue"
          type="search"
          placeholder="Поиск по названию..."
          :has-icon="true"
          @update:modelValue="onSearchInput"
          @enter="searchAndFilterMovies"
        />
        <select
          v-model="selectedGenreValue"
          @change="searchAndFilterMovies"
          class="w-full rounded-xl border-slate-700 bg-black/20 px-4 py-3 text-slate-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Все жанры</option>
          <option v-for="genre in filteredGenres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>

        <select
          v-model="selectedYearValue"
          @change="searchAndFilterMovies"
          class="w-full rounded-xl border-slate-700 bg-black/20 px-4 py-3 text-slate-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Все года</option>
          <option v-for="year in yearsForFilter" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <select
          v-model="selectedSortValue"
          @change="searchAndFilterMovies"
          class="w-full rounded-xl border-slate-700 bg-black/20 px-4 py-3 text-slate-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
        >
          <option v-for="option in sortOptionsAvailable" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="flex justify-end">
        <AppButton @click="clearFilters" variant="outline-blue" size="sm">
          Сбросить фильтры
        </AppButton>
      </div>
    </div>

    <LoadingSpinner v-if="movieStore.isLoading && displayedMovies.length === 0" />
    <div
      v-else-if="displayedMovies.length > 0"
      class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCard v-for="movie in displayedMovies" :key="movie.id" :movie="movie" />
    </div>
    <StatusMessage
      v-else-if="!movieStore.isLoading && displayedMovies.length === 0"
      type="empty"
      title="Фильмы не найдены"
      :message="getEmptyResultMessage()"
    >
      <template #actions v-if="searchQueryValue || selectedGenreValue || selectedYearValue">
        <AppButton @click="clearFiltersAndSearch" variant="primary" size="md">
          Сбросить фильтры
        </AppButton>
      </template>
    </StatusMessage>
    <StatusMessage
      v-if="movieStore.hasError"
      type="error"
      title="Ошибка загрузки"
      :message="movieStore.error"
    />

    <AppPagination
      v-if="movieStore.totalPages > 1 && !movieStore.isLoading"
      :current-page="movieStore.currentPage"
      :total-pages="movieStore.totalPages"
      @page-changed="changeMoviePage"
      class="mt-8"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '@/store/movies'
import MovieCard from '@/components/ui/MovieCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPagination from '@/components/ui/AppPagination.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import StatusMessage from '@/components/ui/StatusMessage.vue'

const movieStore = useMoviesStore()
const route = useRoute()
const router = useRouter()

const searchQueryValue = ref(route.query.searchQuery || '')
const selectedGenreValue = ref(route.query.genre || '')
const selectedYearValue = ref(route.query.year || '')
const selectedSortValue = ref(route.query.sort || 'rating.kp|-1')

const filteredGenres = computed(() => {
  return movieStore.genres.filter((genre) => genre.name !== 'Для взрослых')
})

const displayedMovies = computed(function () {
  return movieStore.movies
})

const yearsForFilter = computed(function () {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let y = currentYear; y >= 1950; y--) {
    years.push(y)
  }
  return years
})

const sortOptionsAvailable = [
  { value: 'rating.kp|-1', label: 'Популярные (сначала)' },
  { value: 'rating.kp|1', label: 'Популярные (сначала не)' },
  { value: 'year|-1', label: 'Год (сначала новые)' },
  { value: 'year|1', label: 'Год (сначала старые)' },
  { value: 'name|1', label: 'Название (А-Я)' },
  { value: 'name|-1', label: 'Название (Я-А)' },
]

let searchTimer = null

async function searchAndFilterMovies(goToFirstPage = true) {
  if (goToFirstPage) {
    movieStore.currentPage = 1
  }

  const queryParamsForRouter = {}
  if (searchQueryValue.value) queryParamsForRouter.searchQuery = searchQueryValue.value
  if (selectedGenreValue.value) queryParamsForRouter.genre = selectedGenreValue.value
  if (selectedYearValue.value) queryParamsForRouter.year = selectedYearValue.value
  if (selectedSortValue.value && selectedSortValue.value !== 'rating.kp|-1') {
    queryParamsForRouter.sort = selectedSortValue.value
  }
  if (movieStore.currentPage > 1) queryParamsForRouter.page = movieStore.currentPage

  router.push({ query: queryParamsForRouter })

  const paramsForApi = {
    page: movieStore.currentPage,
    limit: 20,
  }
  if (searchQueryValue.value) paramsForApi.query = searchQueryValue.value
  if (selectedGenreValue.value) paramsForApi['genres.name'] = selectedGenreValue.value
  if (selectedYearValue.value) paramsForApi.year = selectedYearValue.value

  const sortParts = selectedSortValue.value.split('|')
  paramsForApi.sortField = sortParts[0]
  paramsForApi.sortType = sortParts[1]

  await movieStore.loadMovies(paramsForApi)
}

function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(function () {
    searchAndFilterMovies()
  }, 500)
}

function changeMoviePage(newPageNumber) {
  movieStore.currentPage = newPageNumber
  searchAndFilterMovies(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function clearFilters() {
  searchQueryValue.value = ''
  selectedGenreValue.value = ''
  selectedYearValue.value = ''
  selectedSortValue.value = 'rating.kp|-1'
  searchAndFilterMovies()
}

function clearFiltersAndSearch() {
  clearFilters()
}

function getEmptyResultMessage() {
  if (searchQueryValue.value) {
    return "По запросу '" + searchQueryValue.value + "' ничего не найдено."
  }
  return 'Попробуйте изменить критерии фильтрации.'
}

onMounted(async function () {
  if (movieStore.genres.length === 0) {
    await movieStore.loadGenres()
  }

  const currentQuery = route.query
  searchQueryValue.value = currentQuery.searchQuery || ''
  selectedGenreValue.value = currentQuery.genre || ''
  selectedYearValue.value = currentQuery.year || ''
  selectedSortValue.value = currentQuery.sort || 'rating.kp|-1'
  movieStore.currentPage = parseInt(currentQuery.page) || 1

  searchAndFilterMovies(false)
})

watch(
  function () {
    return route.query
  },
  function (newRouteQuery) {
    searchQueryValue.value = newRouteQuery.searchQuery || ''
    selectedGenreValue.value = newRouteQuery.genre || ''
    selectedYearValue.value = newRouteQuery.year || ''
    selectedSortValue.value = newRouteQuery.sort || 'rating.kp|-1'

    const newPageNumber = parseInt(newRouteQuery.page) || 1
    if (movieStore.currentPage !== newPageNumber) {
      movieStore.currentPage = newPageNumber
    }
    searchAndFilterMovies(false)
  }
)
</script>

<style scoped>
select {
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5em 1.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 2.5rem;
}
select option {
  background-color: #161b22;
  color: #f0f6fc;
}
</style>
