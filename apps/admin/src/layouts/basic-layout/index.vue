<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'

defineOptions({ name: 'BasicLayout' })

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())

const { isMobile } = useMobile()
const { mode, siderVisible, siderWidth, siderCollapsedWidth } = useLayout()

const settingsAble = import.meta.env.DEV || import.meta.env.VITE_PROD_APP_SETTINGS === 'Y'
</script>

<template>
  <app-layout
    :mode="mode"
    :is-mobile="isMobile"
    :scroll-mode="theme.scrollMode"
    :sider-visible="siderVisible"
    :sider-collapse="appStore.siderCollapse"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :fixed-top="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :content-full="appStore.contentFull"
    :content-class="appStore.disableMainXScroll ? 'overflow-x-hidden' : ''"
    :footer-visible="theme.footer.visible"
    :fixed-footer="theme.footer.fixed"
    @click-mobile-sider-mask="appStore.setSiderCollapse(true)"
  >
    <template #sider>
      <app-sider />
    </template>
    <template #header>
      <app-header />
    </template>
    <template #tab>
      <app-tab />
    </template>
    <AppContent />
    <template #footer>
      <app-footer />
    </template>
  </app-layout>
  <app-settings v-if="settingsAble" />
</template>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar(8px, #e1e1e1);
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(8px, #555);
}
</style>
