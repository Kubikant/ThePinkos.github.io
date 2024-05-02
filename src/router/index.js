import { createRouter, createWebHistory } from 'vue-router'
import Kalendar from '../Kalendar/StranaApp.vue'
import Home from '../HlavnaStranka/HlavnaStranka.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
  {
    path: '/kalendar/:id',
    name: 'kalendar',
    component: Kalendar,
    props: (route) => ({ id: route.params.id })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
