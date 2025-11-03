import { http } from '@/utils'
import type { AsyncRouterItemType, LoginFormType, UserInfoType } from './types'
export * from './types'

/** 用户登录接口 */
export const userLoginApi = (data: LoginFormType) => {
  return http.post<
    ApiResponseType<{
      token: string
    }>
  >({
    url: '/login/externalUser',
    data,
    config: {
      showMessage: true,
      showProgress: true,
    },
  })
}

/** 获取用户信息接口 */
export const getUserInfoApi = () => {
  return http.post<ApiResponseType<{ data: UserInfoType }>>({
    url: '/login/getUserInfo',
    config: {
      showProgress: true,
    },
  })
}

/**
 * 获取当前用户菜单
 * @param organizationId 组织id
 */
export const getUserMenusApi = (organizationId: string) => {
  return http.get<ApiResponseType<AsyncRouterItemType[]>>({
    url: '/menu/queryRoutingMenuTree',
    params: {
      organizationId,
    },
    config: {
      showProgress: true,
    },
  })
}
