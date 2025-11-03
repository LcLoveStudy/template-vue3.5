import type { AsyncRouterItemType } from '@/api'
import asyncComponentMap from '@/router/asyncComponentMap'

/**
 * 用于生成异步路由菜单路由
 * @param asyncRouters 接口传来的异步路由列表
 */
export const generateAsyncRouters = (asyncRouters: AsyncRouterItemType[]): AppRouteRecordRaw[] => {
  let currentLayerRouters: AppRouteRecordRaw[] = []
  for (let i = 0; i < asyncRouters.length; i++) {
    let routeItem = asyncRouters[i]
    if (routeItem.path !== '/') {
      let targetRoute: AppRouteRecordRaw = {
        name: routeItem.name,
        path: routeItem.path,
        meta: {
          title: routeItem.title,
          order: routeItem.orderNumber,
          icon: routeItem.icon,
          hidden: routeItem.hidden,
        },
        component: asyncComponentMap[routeItem.component],
        children: [],
      }
      // 递归处理子路由
      if (routeItem.children && routeItem.children.length > 0) {
        targetRoute.children = generateAsyncRouters(routeItem.children)
      }
      // 处理重定向
      if (routeItem.redirect) {
        targetRoute.redirect = routeItem.redirect
      }
      currentLayerRouters.push(targetRoute)
    }
  }
  return currentLayerRouters.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0))
}
