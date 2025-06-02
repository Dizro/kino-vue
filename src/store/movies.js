import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fetchMoviesFromApi,
  fetchMovieDetailFromApi,
  fetchGenresFromApi,
} from '../services/kinopoiskApi'

export const useMoviesStore = defineStore('movies', function () {
  const allMovies = ref([])
  const homePagePopularMovies = ref([])
  const homePageTopRatedMovies = ref([])
  const currentSelectedMovie = ref(null)
  const availableGenres = ref([])

  const favoriteMovies = ref(JSON.parse(localStorage.getItem('kinovue-favorites') || '[]'))

  const isLoadingData = ref(false)
  const errorMessage = ref(null)

  const moviesCurrentPage = ref(1)
  const moviesTotalPages = ref(1)
  const moviesTotalResults = ref(0)

  const hasAnyError = computed(function () {
    return errorMessage.value !== null
  })
  const areMoviesLoaded = computed(function () {
    return allMovies.value.length > 0
  })

  async function getPopularMoviesForHome(count = 4) {
    isLoadingData.value = true
    errorMessage.value = null
    try {
      const currentYear = new Date().getFullYear()
      const data = await fetchMoviesFromApi({
        page: 1,
        limit: count,
        sortField: 'votes.kp',
        sortType: '-1',
        year: currentYear - 1 + '-' + currentYear,
        'rating.kp': '8-10',
      })
      if (data && data.movies) {
        homePagePopularMovies.value = data.movies
      }
    } catch (err) {
      errorMessage.value = err.message || 'Не удалось загрузить популярные фильмы для главной.'
    }
    isLoadingData.value = false
  }

  async function getTopRatedMoviesForHome(count = 4) {
    isLoadingData.value = true
    errorMessage.value = null
    try {
      const data = await fetchMoviesFromApi({
        page: 1,
        limit: count,
        sortField: 'rating.kp',
        sortType: '-1',
        'rating.kp': '7.5-10',
        'votes.kp': '800000-10000000',
      })
      if (data && data.movies) {
        homePageTopRatedMovies.value = data.movies
      }
    } catch (err) {
      errorMessage.value =
        err.message || 'Не удалось загрузить фильмы с высоким рейтингом для главной.'
    }
    isLoadingData.value = false
  }

  async function loadMoviesFromApi(filters = {}) {
    isLoadingData.value = true
    errorMessage.value = null
    try {
      const apiParams = { ...filters }
      const data = await fetchMoviesFromApi(apiParams)
      if (data && data.movies) {
        allMovies.value = data.movies
        moviesTotalPages.value = data.totalPages
        moviesCurrentPage.value = data.currentPage
        moviesTotalResults.value = data.totalResults
      } else {
        allMovies.value = []
        moviesTotalPages.value = 1
        moviesCurrentPage.value = 1
        moviesTotalResults.value = 0
      }
    } catch (err) {
      errorMessage.value = err.message || 'Не удалось загрузить фильмы.'
      allMovies.value = []
    }
    isLoadingData.value = false
  }

  async function loadSingleMovieDetail(movieId) {
    isLoadingData.value = true
    errorMessage.value = null
    currentSelectedMovie.value = null
    try {
      const data = await fetchMovieDetailFromApi(movieId)
      currentSelectedMovie.value = data
    } catch (err) {
      errorMessage.value = err.message || 'Не удалось загрузить детали фильма.'
    }
    isLoadingData.value = false
  }

  async function loadAvailableGenres() {
    if (availableGenres.value.length > 0) return

    isLoadingData.value = true
    errorMessage.value = null
    try {
      const data = await fetchGenresFromApi()
      if (data) {
        availableGenres.value = data
      }
    } catch (err) {
      errorMessage.value = err.message || 'Не удалось загрузить жанры.'
    }
    isLoadingData.value = false
  }

  function toggleMovieFavorite(movie) {
    let movieIndex = -1
    for (let i = 0; i < favoriteMovies.value.length; i++) {
      if (favoriteMovies.value[i].id === movie.id) {
        movieIndex = i
        break
      }
    }

    if (movieIndex === -1) {
      favoriteMovies.value.push({
        id: movie.id,
        title: movie.title,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        year: movie.year,
        voteAverage: movie.voteAverage,
      })
    } else {
      favoriteMovies.value.splice(movieIndex, 1)
    }
    localStorage.setItem('kinovue-favorites', JSON.stringify(favoriteMovies.value))
  }

  const isMovieFavorite = computed(function () {
    return function (movieId) {
      for (let i = 0; i < favoriteMovies.value.length; i++) {
        if (favoriteMovies.value[i].id === movieId) {
          return true
        }
      }
      return false
    }
  })

  return {
    movies: allMovies,
    popularMoviesHome: homePagePopularMovies,
    topRatedMoviesHome: homePageTopRatedMovies,
    currentMovie: currentSelectedMovie,
    genres: availableGenres,
    favorites: favoriteMovies,
    isLoading: isLoadingData,
    error: errorMessage,
    currentPage: moviesCurrentPage,
    totalPages: moviesTotalPages,
    totalResults: moviesTotalResults,
    hasError: hasAnyError,
    hasMovies: areMoviesLoaded,
    fetchPopularMoviesForHome: getPopularMoviesForHome,
    fetchTopRatedMoviesForHome: getTopRatedMoviesForHome,
    loadMovies: loadMoviesFromApi,
    loadMovieDetail: loadSingleMovieDetail,
    loadGenres: loadAvailableGenres,
    toggleFavorite: toggleMovieFavorite,
    isFavorite: isMovieFavorite,
  }
})
