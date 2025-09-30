import NProgress from 'nprogress'
export type ProcessHandlerFnType = (url: string) => void

export const useLoadingProcess = () => {
  const reqList = ref(new Set())
  // 配置进度条
  NProgress.configure({ showSpinner: false, minimum: 0.2, speed: 500 })
  /** 头部进度条开始加载 */
  const startProcess: ProcessHandlerFnType = (url: string) => {
    reqList.value.add(url)
    NProgress.start()
  }
  /** 头部进度条结束加载 */
  const endProcess: ProcessHandlerFnType = (url: string) => {
    if (reqList.value.has(url)) {
      reqList.value.delete(url)
    }
    if (reqList.value.size === 0) {
      NProgress.done()
    }
  }
  return {
    startProcess,
    endProcess
  }
}
