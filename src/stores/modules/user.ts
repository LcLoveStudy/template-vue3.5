import { defineStore } from 'pinia'
import { getUserInfoApi, userLoginApi, type LoginFormType, type UserInfoType } from '@/api'
import { useLocalStorage } from '@/hooks'
import { LocalStorageKeys } from '@/enums/localstorage'
import { clearStores } from '@/stores'
import router from '@/router'

/** 用户信息仓库 */
export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage(LocalStorageKeys.TOKEN, '')
  const userInfo = ref<UserInfoType>({
    firstLogin: false,
    post: '',
    postId: '',
    token: '',
    userCode: '',
    userFlag: '',
    userName: '',
    companyId: '',
  })
  /** 登录 */
  const userLogin = async (form: LoginFormType) => {
    return userLoginApi(form).then(({ data }) => {
      token.value = data.token
      return data
    })
  }

  /** 登出 */
  const useLogout = async () => {
    clearStores()
    router.replace('/login')
  }

  /** 获取用户信息 */
  const getUserInfo = async () => {
    return getUserInfoApi().then(({ data }) => {
      userInfo.value = data.data
      token.value = data.data.token // 更新 token
      return data
    })
  }

  /** 清空仓库数据 */
  const clearStore = () => {
    token.value = ''
    userInfo.value = {
      firstLogin: false,
      post: '',
      postId: '',
      token: '',
      userCode: '',
      userFlag: '',
      userName: '',
      companyId: '',
    }
  }

  return { token, userInfo, userLogin, useLogout, getUserInfo, clearStore }
})
