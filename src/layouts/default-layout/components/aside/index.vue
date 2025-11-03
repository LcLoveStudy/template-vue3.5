<template>
  <div class="default-layout-aside">
    <!-- 菜单项 -->
    <div class="menu">
      <el-menu :collapse="isFolded" router :default-active="currentMenu">
        <MenuItem v-for="item in asyncRouters" :key="item.path" :menu="item" />
      </el-menu>
    </div>
    <!-- 折叠按钮 -->
    <div class="operation" @click="toggleFolded">
      <el-icon :size="20">
        <component :is="foldIcon" />
      </el-icon>
      <div class="operation-text" :class="{ hidden: isFolded }">收起菜单</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useLayoutStore, useRouterStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isFolded } = storeToRefs(useLayoutStore())
const { asyncRouters } = storeToRefs(useRouterStore())
const { toggleFolded } = useLayoutStore()
const currentMenu = ref('')
const route = useRoute()

/** 计算图标 */
const foldIcon = computed(() => {
  return isFolded.value ? ArrowRight : ArrowLeft
})

/** 监听路由，动态更新当前高亮 */
watchEffect(() => {
  if (route && route.path) {
    currentMenu.value = route.path
  }
})
</script>

<style scoped lang="less">
@import url('./menu-resize.less');

.default-layout-aside {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  padding: 1rem 0;
  .menu {
    height: 85vh;
    overflow-x: hidden;
    overflow-y: auto;
    /* ====== 自定义滚动条 ====== */
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(120, 120, 120, 0.25);
      border-radius: 4px;
      border: 1px solid transparent; /* 移除默认边框 */
      background-clip: padding-box; /* 避免出现边框阴影 */
      transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(120, 120, 120, 0.45);
    }
  }
  .operation {
    cursor: pointer;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #333;
    gap: 1rem;
    user-select: none;
    &:hover {
      color: #000;
    }
    .operation-text {
      white-space: nowrap;
      overflow: hidden;
      transition:
        opacity 0.3s,
        width 0.3s;
      opacity: 1;
      width: auto;

      &.hidden {
        opacity: 0;
        width: 0;
      }
    }
  }
}
</style>
