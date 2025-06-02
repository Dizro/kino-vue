import axios from 'axios'

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY
const BASE_URL = import.meta.env.VITE_KINOPOISK_BASE_URL

if (!API_KEY) {
  alert('Ключ API для Кинопоиска не найден. Проверьте .env файл.')
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
})

const requiredMovieFieldsForList = [
  'id',
  'name',
  'alternativeName',
  'year',
  'poster.previewUrl',
  'poster.url',
  'rating.kp',
  'genres.name',
  'countries.name',
  'movieLength',
]

const requiredMovieFieldsForSearch = ['id', 'name', 'year', 'poster.url', 'rating.kp']

function simplifyMovieData(apiMovie) {
  let title = 'Название неизвестно'
  if (apiMovie.name) {
    title = apiMovie.name
  } else if (apiMovie.alternativeName) {
    title = apiMovie.alternativeName
  }

  let poster = null
  if (apiMovie.poster) {
    if (apiMovie.poster.previewUrl) {
      poster = apiMovie.poster.previewUrl
    } else if (apiMovie.poster.url) {
      poster = apiMovie.poster.url
    }
  }

  let yearValue = null
  if (apiMovie.year) {
    yearValue = apiMovie.year
  }

  let releaseDateValue = 'N/A'
  if (yearValue) {
    releaseDateValue = yearValue + '-01-01'
  }

  let ratingValue = 0
  if (apiMovie.rating && apiMovie.rating.kp) {
    ratingValue = apiMovie.rating.kp
  }

  let movieGenres = []
  if (apiMovie.genres && apiMovie.genres.length > 0) {
    movieGenres = apiMovie.genres.map(function (g) {
      return g.name
    })
  }

  let movieCountries = []
  if (apiMovie.countries && apiMovie.countries.length > 0) {
    movieCountries = apiMovie.countries.map(function (c) {
      return c.name
    })
  }

  return {
    id: apiMovie.id,
    title: title,
    posterPath: poster,
    releaseDate: releaseDateValue,
    year: yearValue,
    voteAverage: ratingValue,
    genres: movieGenres,
    countries: movieCountries,
    movieLength: apiMovie.movieLength || null,
  }
}

function simplifyMovieDetailData(apiMovieDetail) {
  const basicMovieInfo = simplifyMovieData(apiMovieDetail)

  let description = 'Описание отсутствует.'
  if (apiMovieDetail.description) {
    description = apiMovieDetail.description
  } else if (apiMovieDetail.shortDescription) {
    description = apiMovieDetail.shortDescription
  }

  let backdrop = basicMovieInfo.posterPath
  if (apiMovieDetail.backdrop) {
    if (apiMovieDetail.backdrop.url) {
      backdrop = apiMovieDetail.backdrop.url
    } else if (apiMovieDetail.backdrop.previewUrl) {
      backdrop = apiMovieDetail.backdrop.previewUrl
    }
  }

  let movieActors = []
  if (apiMovieDetail.persons) {
    const actorsOnly = apiMovieDetail.persons.filter(function (p) {
      return p.enProfession === 'actor' || p.profession === 'актеры'
    })
    movieActors = actorsOnly.slice(0, 10).map(function (actor) {
      return {
        id: actor.id,
        name: actor.name || actor.enName || 'Актер неизвестен',
        character: actor.description || '',
        profilePath: actor.photo || null,
      }
    })
  }

  return {
    ...basicMovieInfo,
    overview: description,
    backdropPath: backdrop,
    runtime: apiMovieDetail.movieLength || null,
    cast: movieActors,
  }
}

function showApiError(error, message) {
  console.error(message, error)
  let errorMessage = 'Произошла ошибка при запросе к API.'
  if (error.response) {
    errorMessage = 'Ошибка сервера: ' + error.response.status
  } else if (error.request) {
    errorMessage = 'Нет ответа от сервера.'
  } else {
    errorMessage = 'Ошибка: ' + error.message
  }
  throw new Error(errorMessage)
}

export async function fetchMoviesFromApi(params = {}) {
  const apiParams = {
    page: params.page || 1,
    limit: params.limit || 20,
    sortField: params.sortField || 'rating.kp',
    sortType: params.sortType || '-1',
    selectFields: requiredMovieFieldsForList,
    notNullFields: requiredMovieFieldsForSearch,
  }

  if (params.query) {
    apiParams.query = params.query
    apiParams.selectFields = []
    apiParams.notNullFields = []
    delete apiParams.sortField
    delete apiParams.sortType
  }
  if (params['genres.name']) {
    apiParams['genres.name'] = params['genres.name']
  }
  if (params.year) {
    apiParams.year = params.year
  }
  if (params['rating.kp']) {
    apiParams['rating.kp'] = params['rating.kp']
  }
  if (params['votes.kp']) {
    apiParams['votes.kp'] = params['votes.kp']
  }

  const endpoint = params.query ? '/v1.4/movie/search' : '/v1.4/movie'

  try {
    const response = await apiClient.get(endpoint, { params: apiParams })
    const data = response.data
    return {
      movies: data.docs.map(simplifyMovieData),
      totalPages: Math.min(data.pages, 500),
      totalResults: data.total,
      currentPage: data.page,
    }
  } catch (error) {
    showApiError(error, 'Не удалось загрузить фильмы')
  }
}

export async function fetchMovieDetailFromApi(movieId) {
  try {
    const response = await apiClient.get('/v1.4/movie/' + movieId)
    return simplifyMovieDetailData(response.data)
  } catch (error) {
    showApiError(error, 'Не удалось загрузить детали фильма с ID ' + movieId)
  }
}

export async function fetchGenresFromApi() {
  try {
    const response = await apiClient.get('/v1/movie/possible-values-by-field', {
      params: { field: 'genres.name' },
    })
    return response.data.map(function (genre) {
      const name = genre.name
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
      return {
        id: name,
        name: capitalizedName,
      }
    })
  } catch (error) {
    showApiError(error, 'Не удалось загрузить список жанров')
  }
}
