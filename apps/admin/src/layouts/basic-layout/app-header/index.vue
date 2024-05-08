<script setup lang="ts">
import { useMobile } from '../hooks'
import Breadcrumb from './breadcrumb/index.vue'
import HeaderMenu from './header-menu.vue'
import Search from './search/index.vue'
import ThemeMode from './theme-mode.vue'
import Logo from '@/layouts/basic-layout/app-logo/index.vue'
import GitHubSite from '@/layouts/basic-layout/app-header/github/index.vue'
import Fullscreen from '@/layouts/basic-layout/app-header/fullscreen/index.vue'
import MenuCollapse from '@/layouts/basic-layout/app-header/collapse/index.vue'
import SystemMessage from '@/layouts/basic-layout/app-header/notifications/index.vue'
import UserAvatar from '@/layouts/basic-layout/app-header/avatar/index.vue'
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
    <Logo
      v-if="headerProps.showLogo"
      show-title
      class="h-full"
      :style="{ width: `${theme.sider.width}px` }"
    />
    <div v-if="!headerProps.showHeaderMenu" class="flex items-center h-full">
      <MenuCollapse v-if="headerProps.showMenuCollapse || isMobile" />
      <Breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <HeaderMenu v-else />
    <div class="flex ml-auto h-full">
      <Search />
      <GitHubSite />
      <Fullscreen />
      <ThemeMode />
      <LangSelect with-hover-container />
      <SystemMessage />
      <UserAvatar />
    </div>
  </n-layout-header>
</template>

<style scoped>
</style>
