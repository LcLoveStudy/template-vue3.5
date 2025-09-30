export * from './modules/user'
export * from './modules/router'
import { useUserStore } from './modules/user'
import { useRouterStore } from './modules/router'

const stores = [useUserStore, useRouterStore]

/** 清空仓库 */
export const clearStores = () => {
  stores.forEach((store) => {
    const { clearStore } = store()
    clearStore()
  })
}
