import type { AxiosRequestConfig } from 'axios'

/** 所有请求都应该遵守的约定 */
interface HttpRequestType {
  url: string
  config?: AxiosRequestConfig & {
    showMessage?: boolean
    message?: string
    showProgress?: boolean
    // 上传文件使用以下
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  }
}

/** get请求的参数限制 */
export interface HttpGetRequestType extends HttpRequestType {
  params?: object
}

/** post请求的参数限制 */
export interface HttpPostRequestType extends HttpRequestType {
  data?: object
}
