import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    component:_=>import('@/components/Login')
  },
  {
    path: '/notebooks',
    component: _ => import('@/components/Test'),
    meta: { needLogin: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
