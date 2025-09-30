<template>
  <div class="default-layout">
    <div class="default-layout__header"></div>
    <div class="default-layout__content" :class="{ fold: menuFlod }">
      <div class="default-layout__content__left"></div>
      <div class="default-layout__content__right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { menuFlod } = storeToRefs(useLayoutStore())
</script>

<style scoped lang="less">
.default-layout {
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 1fr;
  &__header {
    background-color: #f5f5f5;
  }
  &__content {
    display: grid;
    grid-template-columns: 15rem 1fr;
    &.fold {
      grid-template-columns: 5rem 1fr;
    }
    &__left {
      background-color: #e0e0e0;
    }
    &__right {
      background-color: #d0d0d0;
    }
  }
}
</style>
