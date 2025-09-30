import * as HttpType from '@/utils/serve/types'
/**
 * 配置FormData数据结构上传时的处理函数
 * @param arg 自定义HTTP的config配置
 */
export const setFormDataConfig = (
  arg: HttpType.HttpPostRequestType | HttpType.HttpGetRequestType
) => {
  if (
    arg &&
    arg.config &&
    arg.config.headers &&
    arg.config.headers['Content-Type'] &&
    arg.config.headers['Content-Type'] === 'multipart/form-data'
  ) {
    arg.config.transformRequest = [
      (data: any) => {
        const fordata = new FormData()
        Object.keys(data).forEach((key) => {
          fordata.append(key, data[key])
        })
        return fordata
      }
    ]
  }
}
