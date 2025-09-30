<template>
  <div class="login_container">
    <div class="form_box">
      <div class="title">{{ ConstEnums.PROJECT_NAME }}</div>
      <div class="p-[10px]">
        <el-form ref="loginFormRef" :model="loginForm" label-width="auto" :rules="rules">
          <el-form-item prop="userCode">
            <el-input size="large" v-model="loginForm.userCode" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              size="large"
              class="mt-2"
              type="password"
              v-model="loginForm.password"
              placeholder="密码"
              show-password
            />
          </el-form-item>
        </el-form>
        <el-button class="w-full mt-6" size="large" type="primary" :loading @click="loginHandler"
          >登 录</el-button
        >
        <div class="flex justify-center mt-8">
          <el-tooltip effect="dark" content="请联系管理员重置密码！" placement="top">
            <span class="text-[#6c757d] text-[14px] cursor-pointer">忘记密码？</span>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginFormType } from '@/api'
import { ConstEnums } from '@/enums/const-enums'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores'
const { userLogin } = useUserStore()

onMounted(() => {
  // 每次进入到登录页面时清除本地存储
  localStorage.clear()
})

const loading = ref(false)
const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginFormType>({
  userCode: '',
  password: '',
})
const rules = reactive<FormRules<LoginFormType>>({
  userCode: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

/** 点击登录 */
const loginHandler = () => {
  if (!loginFormRef.value) return
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    userLogin(loginForm)
      .then(() => {
        router.push('/')
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>

<style scoped lang="scss">
.login_container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login/login_bg.jpg') no-repeat 50%;
  .form_box {
    position: absolute;
    top: 50%;
    right: 10%;
    width: 360px;
    height: 380px;
    margin-top: -230px;
    padding: 10px 20px 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 2px #ccc;
    z-index: 2;
    .title {
      display: flex;
      height: 80px;
      justify-content: center;
      font-size: 27px;
    }
  }
}
</style>
