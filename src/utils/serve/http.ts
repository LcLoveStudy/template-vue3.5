import axios, { type AxiosInstance } from 'axios'
import { initRequestInterceptors, initResponseInterceptor } from './interceptors'
import { setFormDataConfig } from './setFormDataConfig'
import * as HttpType from '@/utils/serve/types'
import { useLoadingProcess } from '@/hooks'
const { endProcess, startProcess } = useLoadingProcess()
// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: '/nursingworkers',
})

// 添加请求拦截器
initRequestInterceptors(service, startProcess)

// 添加响应拦截器
initResponseInterceptor(service, endProcess)

export const http = {
  // get请求
  get<T>(arg: HttpType.HttpGetRequestType): Promise<T> {
    return service.get(arg.url, { params: arg.params, ...arg.config })
  },
  // post请求
  post<T>(arg: HttpType.HttpPostRequestType): Promise<T> {
    setFormDataConfig(arg)
    return service.post(arg.url, arg.data, arg.config)
  },
}
