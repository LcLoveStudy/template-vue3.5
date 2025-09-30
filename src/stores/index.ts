export * from './modules/user'
export * from './modules/router'
export * from './modules/layout'
import { useUserStore } from './modules/user'
import { useRouterStore } from './modules/router'
import { useLayoutStore } from './modules/layout'

const stores = [useUserStore, useRouterStore, useLayoutStore]

/** 清空仓库 */
export const clearStores = () => {
  stores.forEach((store) => {
    const { clearStore } = store()
    clearStore()
  })
}
