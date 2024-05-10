<script setup lang="ts">
import { useMobile } from '@/hooks'
import { useThemeStore } from '@/store'

defineOptions({ name: 'AppHeader' })

const { theme } = storeToRefs(useThemeStore())

const { isMobile } = useMobile()

const LAYOUT_HEADER_PROPS = {
  'vertical': {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: true,
  },
  'vertical-mix': {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: false,
  },
  'horizontal': {
    showLogo: true,
    showHeaderMenu: true,
    showMenuCollapse: false,
  },
  'horizontal-mix': {
    showLogo: true,
    showHeaderMenu: false,
    showMenuCollapse: true,
  },
}

const headerProps = computed(() => LAYOUT_HEADER_PROPS[theme.value.layout.mode])
</script>

<template>
  <n-layout-header
    class="app-header flex items-center h-full"
    :inverted="theme.header.inverted"
  >
    <app-logo
      v-if="headerProps.showLogo"
      show-title
      class="h-full pl-2"
    />
    <div v-if="!headerProps.showHeaderMenu" class="flex items-center h-full">
      <app-header-collapse v-if="headerProps.showMenuCollapse || isMobile" />
      <app-header-breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <app-header-menu v-else />
    <div class="flex ml-auto h-full">
      <app-header-search />
      <app-header-github />
      <app-header-fullscreen />
      <app-header-theme-mode />
      <lang-select with-hover-container />
      <app-header-notifications />
      <app-header-avatar />
    </div>
  </n-layout-header>
</template>

<style scoped>
</style>
