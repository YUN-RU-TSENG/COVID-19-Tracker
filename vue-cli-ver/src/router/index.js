import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/country/:country',
    name: 'country',
    component: () => import('@/views/Information.vue')
  },
  {
    path: '*',
    redirect: { name: 'home' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
