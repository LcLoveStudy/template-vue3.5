import type { RouteRecordRaw } from 'vue-router'

declare global {
  interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    meta: RouteMeta & {
      title?: string
      order?: number
      icon?: string
      hidden?: boolean
    }
    children?: AppRouteRecordRaw[]
  }
}
