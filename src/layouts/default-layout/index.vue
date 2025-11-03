<template>
  <div class="default-layout">
    <div class="default-layout__header">
      <default-layout-header />
    </div>
    <div class="default-layout__content" :class="{ fold: isFolded }">
      <div class="default-layout__content__left">
        <default-layout-aside />
      </div>
      <div class="default-layout__content__right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DefaultLayoutHeader, DefaultLayoutAside } from './components'
import { useLayoutStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isFolded } = storeToRefs(useLayoutStore())
</script>

<style scoped lang="less">
@import url('@/assets/style/variables.less');
.default-layout {
  height: 100vh;
  display: grid;
  grid-template-rows: @default-layout-header-height 1fr;
  grid-template-columns: 1fr;
  &__content {
    display: grid;
    grid-template-columns: 240px 1fr;
    transition: all 0.3s ease-in-out;
    // 折叠状态的侧边栏样式
    &.fold {
      grid-template-columns: 5rem 1fr;
    }
    &__left {
      background-color: @default-layout-aside-background-color;
    }
    &__right {
      background-color: #d0d0d0;
      padding: 1rem;
    }
  }
}
</style>
