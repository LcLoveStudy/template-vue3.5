import { getUserMenusApi } from '@/api'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { generateAsyncRouters } from '@/utils/router'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

/** 用户信息仓库 */
export const useRouterStore = defineStore('router', () => {
  /** 异步路由列表（只保留了部分字段） */
  const asyncRouters = ref<AppRouteRecordRaw[]>([])

  /** 获取异步路由 */
  const getAsyncRouters = async () => {
    const { userInfo } = useUserStore()
    if (!userInfo.companyId) return
    return getUserMenusApi(userInfo.companyId).then(({ data }) => {
      asyncRouters.value = [
        {
          path: '/home',
          meta: {
            title: '发布管理',
            icon: 'HomeFilled',
          },
          component: () => import('@/views/system/index.vue'),
        },
        ...generateAsyncRouters(data),
      ]
      let systemRoutes = {
        path: '/',
        redirect: '/home',
        component: () => import('@/layouts/default-layout/index.vue'),
        children: asyncRouters.value,
      }
      // addRoute方法只能接收RouteRecordRaw类型，只能断言成RouteRecordRaw
      router.addRoute(systemRoutes as RouteRecordRaw)
    })
  }

  /** 清空仓库数据 */
  const clearStore = () => {
    asyncRouters.value = []
  }
  return { asyncRouters, getAsyncRouters, clearStore }
})
