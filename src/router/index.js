import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/IndexLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/movie',
          name: 'movie',
          component: () => import('@/views/MovieView.vue')
        },
        {
          path: '/tv-series',
          name: 'tv-series',
          component: () => import('@/views/TVSeriesView.vue')
        },
        {
          path: '/watchlist',
          name: 'watchlist',
          component: () => import('@/views/WatchlistView.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/SearchView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
