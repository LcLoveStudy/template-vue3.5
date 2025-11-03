<template>
  <div class="default-layout-aside">
    <!-- 菜单项 -->
    <div class="menu">
      <el-menu :collapse="isFolded">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <component :is="ElementPlusIconsVue['Location']" />
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isFolded } = storeToRefs(useLayoutStore())
const { toggleFolded } = useLayoutStore()

/** 计算图标 */
const foldIcon = computed(() => {
  return isFolded.value ? ArrowRight : ArrowLeft
})
</script>

<style scoped lang="less">
:deep(.el-menu--collapse) {
  width: 100%;
}
:deep(.el-menu) {
  background-color: transparent;
}
.default-layout-aside {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  padding: 0 0 1rem 0;
  .menu {
    height: 100%;
    overflow-x: hidden;
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
