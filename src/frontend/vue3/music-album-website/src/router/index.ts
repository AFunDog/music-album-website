import BlackThemeView from '@/views/BlackThemeView.vue'
import HomeView from '@/views/HomeView.vue'
import WhiteThemeView from '@/views/WhiteThemeView.vue'
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
    },
    {
      path: '/white',
      name: 'white',
      component: WhiteThemeView,
    }
  ],
})

export default router
