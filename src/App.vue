<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useTitle } from '@/hooks'
import { ConstEnums } from '@/enums/const-enums'
const route = useRoute()
const title = useTitle('')

watchEffect(() => {
  if (route.meta.title) {
    title.value = `${route.meta.title} - ${ConstEnums.PROJECT_NAME}`
  } else {
    title.value = ConstEnums.PROJECT_NAME
  }
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
