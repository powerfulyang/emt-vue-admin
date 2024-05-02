<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconFold from './icon-fold.vue'
import IconUnfold from './icon-unfold.vue'
import { useAppStore, useThemeStore } from '@/store'

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())
</script>

<template>
  <hover-container
    class="w-10 h-full"
    :inverted="theme.header.inverted"
    @click="appStore.toggleSiderCollapse"
  >
    <n-icon size="18">
      <IconFold v-if="appStore.siderCollapse" />
      <IconUnfold v-else />
    </n-icon>
  </hover-container>
</template>
