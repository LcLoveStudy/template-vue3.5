<template>
  <div class="default-layout-header">
    <img class="logo" :src="LogoImg" />
    <div class="system-name">{{ ConstEnums.PROJECT_NAME }}</div>
    <el-dropdown>
      <div class="user-menu">
        {{ userInfo.userName }}
        <el-icon>
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="useLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ArrowDown } from '@element-plus/icons-vue'
import LogoImg from '@/assets/images/layout/logo.png'
import { ConstEnums } from '@/enums/const-enums'
const { userInfo } = storeToRefs(useUserStore())
const { useLogout } = useUserStore()
</script>

<style scoped lang="less">
@import url('@/assets/style/variables.less');
.default-layout-header {
  background-color: @default-layout-header-background-color;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr 10rem;
  align-items: center;
  gap: 1.5rem;
  padding: 5px 0 5px 2rem;
  .logo {
    height: calc(@default-layout-header-height - 10px);
  }
  .system-name {
    color: #2c68b1;
    font-weight: 700;
    font-size: 1.3rem;
    margin-top: -0.3rem;
  }
  .user-menu {
    cursor: pointer;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
:deep(.el-dropdown) {
  &:focus-visible {
    border: none;
    outline: none;
  }
  .el-tooltip__trigger:focus-visible {
    border: none;
    outline: none;
  }
}
</style>
