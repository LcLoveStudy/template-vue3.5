import type { RouteRecordRaw } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

declare global {
  type ElementPlusIconName = keyof typeof ElementPlusIconsVue

  /** 自定义路由meta */
  interface RouteMeta {
    title?: string
    order?: number
    icon?: ElementPlusIconName
    hidden?: boolean
  }
  /** 自定义路由类型 */
  interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    meta: RouteMeta
    children?: AppRouteRecordRaw[]
  }
}
