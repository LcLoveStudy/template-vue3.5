import type { AsyncRouterItemType } from '@/api'
import asyncComponentMap from '@/router/asyncComponentMap'

/**

* 生成单层异步路由
* @param asyncRouters 接口返回的异步路由列表
* @returns 当前层路由
  */
const generateAsyncRouters = (asyncRouters: AsyncRouterItemType[]): AppRouteRecordRaw[] => {
  return asyncRouters
    .filter((route) => route.path !== '/') // 排除根路径
    .map((route) => {
      const children =
        route.children && route.children.length > 0 ? generateAsyncRouters(route.children) : []

      const targetRoute: AppRouteRecordRaw = {
        name: route.name,
        path: route.path,
        meta: {
          title: route.title || '',
          order: route.orderNumber ?? 0,
          icon: route.icon || '',
          hidden: route.hidden ?? false,
        },
        component: asyncComponentMap[route.component],
        children,
        redirect: route.redirect || undefined,
      }
      return targetRoute
    })
}

/**
 * 对路由进行全局排序（包括子路由）
 * @param routes 路由列表
 */
const sortRoutesRecursively = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.children = sortRoutesRecursively(route.children)
    }
  })
  return routes.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0))
}

/**
 * 系统默认路由
 */
const defaultRoutes: AppRouteRecordRaw[] = [
  {
    path: '/home',
    meta: {
      title: '发布管理',
      icon: 'HomeFilled',
      order: 0,
    },
    component: () => import('@/views/system/home/index.vue'),
  },
]

/**

* 生成完整系统路由
* @param asyncRouters 接口返回的异步路由列表
* @returns 系统路由列表，可直接用于路由配置和菜单渲染
  */
export const buildSystemRoutes = (asyncRouters: AsyncRouterItemType[]): AppRouteRecordRaw[] => {
  const asyncRouteList = generateAsyncRouters(asyncRouters)
  const combinedRoutes = [...defaultRoutes, ...asyncRouteList]
  return sortRoutesRecursively(combinedRoutes)
}
