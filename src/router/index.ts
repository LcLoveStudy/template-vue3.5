import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      meta: {
        title: '登录',
      },
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})
setupRouterGuards(router)

export default router
