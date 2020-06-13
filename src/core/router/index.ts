import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppRoutes from '@/application/ui/routes/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/users'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.addRoutes(AppRoutes)

export default router
