/** 登录表单类型 */
export type LoginFormType = {
  userCode: string
  password: string
}

/** 用户信息类型 */
export type UserInfoType = {
  companyId: string
  firstLogin: boolean //是否第一次登录
  post: string //岗位
  postId: string //岗位ID
  token: string //token
  userCode: string //用户账号
  userFlag: string
  userName: string //用户名
}

export type AsyncRouterItemType = {
  children: AsyncRouterItemType[]
  component: string
  hidden: string
  icon: string
  id: string
  menuCode: number
  meta: {
    title: string
    keepAlive: boolean
  }
  name: string
  noDropdown: boolean
  orderNumber: number
  path: string
  redirect: string
  title: string
}
