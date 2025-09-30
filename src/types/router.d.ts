import type { RouteRecordRaw } from 'vue-router'

declare global {
  /**
   * 扩展的路由类型，保证 meta 一定存在并带上我们需要的字段
   */
  interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    meta: {
      title?: string
      order?: number
      icon?: string
      hidden?: boolean
    }
    children?: AppRouteRecordRaw[]
  }
}
