<template>
  <template v-if="menu.children && menu.children.length && !menu.meta.hidden">
    <el-sub-menu :index="menu.path">
      <template #title>
        <el-icon v-if="menu.meta?.icon">
          <component :is="ElementPlusIconsVue[menu.meta.icon]" />
        </el-icon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <MenuItem v-for="child in menu.children" :key="child.path" :menu="child" />
    </el-sub-menu>
  </template>
  <template v-else-if="!menu.meta.hidden">
    <el-menu-item :index="menu.path">
      <el-icon v-if="menu.meta?.icon">
        <component :is="ElementPlusIconsVue[menu.meta.icon]" />
      </el-icon>
      <span>{{ menu.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
defineProps<{ menu: AppRouteRecordRaw }>()
</script>

<style scoped lang="less">
@import url('./menu-resize.less');
</style>
