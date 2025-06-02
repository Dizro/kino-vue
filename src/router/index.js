import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const siteTitle = 'КиноВью'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: HomeView,
    meta: { title: siteTitle + ' - Главная' },
  },
  {
    path: '/movies',
    name: 'Каталог',
    component: function () {
      return import('../views/CatalogView.vue')
    },
    meta: { title: 'Каталог фильмов - ' + siteTitle },
  },
  {
    path: '/movie/:id',
    name: 'Детали фильма',
    component: function () {
      return import('../views/MovieDetailView.vue')
    },
  },
  {
    path: '/favorites',
    name: 'Избранное',
    component: function () {
      return import('../views/FavoritesView.vue')
    },
    meta: { title: 'Избранные фильмы - ' + siteTitle },
  },
  {
    path: '/stats-form',
    name: 'Форма обратной связи',
    component: function () {
      return import('../views/StatsFormView.vue')
    },
    meta: { title: 'Обратная связь - ' + siteTitle },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Не найдено',
    component: function () {
      return import('../views/NotFoundView.vue')
    },
    meta: { title: 'Страница не найдена - ' + siteTitle },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title
  } else if (to.name === 'Детали фильма' && !to.meta.title) {
    document.title = siteTitle
  } else {
    document.title = siteTitle
  }
  next()
})

export default router
