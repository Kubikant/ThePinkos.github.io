import { createRouter, createWebHistory } from 'vue-router'

import Kalendar from '@/views/KalendarView.vue'

const routes = [
  { path: '/', component: Kalendar }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router