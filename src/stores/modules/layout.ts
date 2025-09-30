import { defineStore } from 'pinia'

/** 管理布局信息的 */
export const useLayoutStore = defineStore('layout', () => {
  /** 侧边栏是否是折叠状态 */
  const isFolded = ref(false)

  /** 切换侧边栏折叠状态 */
  const toggleFolded = () => {
    isFolded.value = !isFolded.value
  }

  /** 清空仓库 */
  const clearStore = () => {
    isFolded.value = false
  }
  return { isFolded, toggleFolded, clearStore }
})
