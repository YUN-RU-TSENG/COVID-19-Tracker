import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/baseCard',
    name: 'baseCard',
    component: () => import('@/components/BaseCard.vue')
  },
  {
    path: '/baseItem',
    name: 'baseItem',
    component: () => import('@/components/BaseItem.vue')
  },
  {
    path: '/baseNavbar',
    name: 'baseNavbar',
    component: () => import('@/components/BaseNavbar.vue')
  },
  {
    path: '/baseSideBar',
    name: 'baseSideBar',
    component: () => import('@/components/BaseSideBar.vue')
  },
  {
    path: '/baseSortbar',
    name: 'baseSortbar',
    component: () => import('@/components/BaseSortbar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
