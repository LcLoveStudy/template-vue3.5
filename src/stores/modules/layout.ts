import { defineStore } from 'pinia'

/** 管理布局信息的 */
export const useLayoutStore = defineStore('layout', () => {
  const menuFlod = ref(false)

  /** 清空仓库 */
  const clearStore = () => {
    menuFlod.value = false
  }
  return { menuFlod, clearStore }
})
