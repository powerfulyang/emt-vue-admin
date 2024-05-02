<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Logo from '../components/logo.vue'
import { useMobile } from '../hooks'
import MenuCollapse from './menu-collapse/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import HeaderMenu from './header-menu.vue'
import Search from './search/index.vue'
import GitHubSite from './github-site/index.vue'
import FullScreen from './full-screen/index.vue'
import ThemeMode from './theme-mode.vue'
import SystemMessage from './system-message/index.vue'
import UserAvatar from './user-avatar/index.vue'
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
  <dark-mode-container
    class="app-header flex items-center h-full"
    :inverted="theme.header.inverted"
  >
    <Logo
      v-if="headerProps.showLogo"
      show-title
      class="h-full"
      :style="{ width: `${theme.sider.width}px` }"
    />
    <div v-if="!headerProps.showHeaderMenu" class="flex items-center flex-1 h-full overflow-hidden">
      <MenuCollapse v-if="headerProps.showMenuCollapse || isMobile" />
      <Breadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <HeaderMenu v-else />
    <div class="flex justify-end h-full">
      <Search />
      <GitHubSite />
      <FullScreen />
      <ThemeMode />
      <LangSelect with-hover-container />
      <SystemMessage />
      <UserAvatar />
    </div>
  </dark-mode-container>
</template>

<style scoped>
.app-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
