import { getUserMenusApi } from '@/api'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { generateAsyncRouters } from '@/utils/router'

/** 用户信息仓库 */
export const useRouterStore = defineStore('router', () => {
  /** 异步路由列表 */
  const asyncRouters = ref<AppRouteRecordRaw[]>([])

  /** 获取异步路由 */
  const getAsyncRouters = async () => {
    const { userInfo } = useUserStore()
    if (!userInfo.companyId) return
    return getUserMenusApi(userInfo.companyId).then(({ data }) => {
      asyncRouters.value = generateAsyncRouters(data)
      console.log(asyncRouters.value)
    })
  }

  /** 清空仓库数据 */
  const clearStore = () => {
    asyncRouters.value = []
  }
  return { asyncRouters, getAsyncRouters, clearStore }
})
