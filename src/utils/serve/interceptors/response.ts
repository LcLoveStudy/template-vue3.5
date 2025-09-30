import type { ProcessHandlerFnType } from '@/hooks'
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

/**
 * 初始化响应拦截器
 * @param service axios实例对象
 */
export const initResponseInterceptor = (
  service: AxiosInstance,
  endProcess: ProcessHandlerFnType,
) => {
  service.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response
      const { showMessage, message } = response.config.headers
      endProcess(response.config.url as string)
      if (data.code === 1) {
        ElMessage.error(data.msg)
        return Promise.reject(data.msg)
      }
      // 判断是否展示接口信息
      if (showMessage) {
        const messageInfo = decodeURIComponent(message)
        ElMessage({
          message: messageInfo !== 'undefined' ? messageInfo : data?.msg,
          type: response.status === 200 ? 'success' : 'error',
        })
      }
      return data
    },
    (error: AxiosError) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对状态码处理
      switch (error.response?.status) {
        case 404:
          error.message = '请求地址不存在'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        default:
          error.message = '网络异常'
          break
      }
      endProcess(error.config?.url as string)
      ElMessage.error(error.message)
      return Promise.reject(error)
    },
  )
}
