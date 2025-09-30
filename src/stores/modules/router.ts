import { getUserMenusApi } from '@/api'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

/** 用户信息仓库 */
export const useRouterStore = defineStore('router', () => {
  const asyncRouters = ref([])

  /** 获取异步路由 */
  const getAsyncRouters = async () => {
    const { userInfo } = useUserStore()
    if (!userInfo.companyId) return
    return getUserMenusApi(userInfo.companyId).then(({ data }) => {
      console.log(data)
    })
  }

  /** 清空仓库数据 */
  const clearStore = () => {
    asyncRouters.value = []
  }
  return { asyncRouters, getAsyncRouters, clearStore }
})
