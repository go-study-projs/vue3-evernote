import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    component:_=>import('@/components/Login.jsx')
  },
  {
    path: '/notebooks',
    component: _ => import('@/components/NotebookList'),
    meta: { needLogin: true }
  },
  {
    path: '/note',
    component: _ => import('@/components/NoteDetail'),
    meta: { needLogin: true }
  },
  {
    path: '/trash',
    component: _ => import('@/components/TrashDetail'),
    meta: { needLogin: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
