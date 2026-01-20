import BlackThemeView from '@/views/BlackThemeView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/black',
      name: 'black',
      component: BlackThemeView,
    }
  ],
})

export default router
