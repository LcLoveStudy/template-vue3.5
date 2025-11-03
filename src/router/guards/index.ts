import type { Router } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useRouterStore, useUserStore } from '@/stores'
/** 初始化路由导航守卫 */
export const setupRouterGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { token, userInfo, getUserInfo } = useUserStore()
    if (to.path === '/login') return next()
    if (!token) return next('/login')
    if (token && !userInfo?.userName) {
      try {
        // 获取用户信息和菜单
        await getUserInfo()
        const { getAsyncRouters } = useRouterStore()
        await getAsyncRouters()
        return next({ ...to, replace: true })
      } catch (err) {
        ElMessage.error('获取用户信息失败，请重新登录')
        return next('/login')
      }
    } else {
      return next()
    }
  })
}
