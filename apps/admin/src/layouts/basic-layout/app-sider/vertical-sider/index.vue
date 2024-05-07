<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import VerticalMenu from './vertical-menu.vue'
import Logo from '@/layouts/basic-layout/app-logo/index.vue'
import { useLayout } from '@/layouts/basic-layout/hooks.ts'
import { useAppStore, useThemeStore } from '@/store'

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())

const isHorizontalMix = computed(() => theme.value.layout.mode === 'horizontal-mix')
const showTitle = computed(
  () => !appStore.siderCollapse && theme.value.layout.mode !== 'vertical-mix',
)
const { siderWidth, siderCollapsedWidth } = useLayout()
</script>

<template>
  <n-layout-sider
    v-model:collapsed="appStore.siderCollapse"
    show-trigger="bar"
    class="flex flex-col h-full"
    collapse-mode="width"
    :collapsed-width="siderCollapsedWidth"
    :width="siderWidth"
    :native-scrollbar="false"
    :inverted="theme.sider.inverted"
  >
    <Logo
      v-if="!isHorizontalMix"
      :show-title="showTitle"
      :style="{ height: `${theme.header.height}px` }"
    />
    <VerticalMenu />
  </n-layout-sider>
</template>
