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
      asyncRouters.value = generateAsyncRouters(data)
      asyncRouters.value.forEach((route) => {
        // addRoute方法只能接收只能断言成RouteRecordRaw类型，只能断言成RouteRecordRaw
        router.addRoute(route as RouteRecordRaw)
      })
    })
  }

  /** 清空仓库数据 */
  const clearStore = () => {
    asyncRouters.value = []
  }
  return { asyncRouters, getAsyncRouters, clearStore }
})
