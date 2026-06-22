import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const routes = [
     { path: '/', component: HomeView },
     { path: '/favorites', component: FavoritesView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})