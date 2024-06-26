<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MixMenuItem from './mix-menu-item.vue'
import MixMenuDrawer from './mix-menu-drawer/index.vue'
import MixMenuCollapse from './mix-menu-collapse/index.vue'
import { type MenuOption, useAppStore, useMenuStore, useThemeStore } from '@/store'
import { DarkModeContainer } from '@/components'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()
const { theme } = storeToRefs(useThemeStore())

const activeKey = ref<string>()

const mixMenuDrawerRef = ref<InstanceType<typeof MixMenuDrawer>>()

function handleMixMenuChange({ key, children }: MenuOption) {
  activeKey.value = key
  if (children && children.length) {
    mixMenuDrawerRef.value?.show(children)
  }
  else {
    router.push({ name: key })
  }
}

function setActiveKeyByRoute() {
  const routeName = (route.meta.activeMenu ?? route.name) as string
  for (const { key, children } of menuStore.menus) {
    if (routeName.includes(key)) {
      activeKey.value = key
      if (children && children.length) {
        mixMenuDrawerRef.value?.setMenus(children)
        mixMenuDrawerRef.value?.setExpandKeys(children)
      }
      else {
        mixMenuDrawerRef.value?.setMenus([])
      }
      break
    }
  }
}

function handleMouseLeave() {
  mixMenuDrawerRef.value?.hide()
  setActiveKeyByRoute()
}

watch(() => route.name, setActiveKeyByRoute, { immediate: true })
</script>

<template>
  <DarkModeContainer
    class="flex h-full"
    :inverted="theme.sider.inverted"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex flex-col items-stretch flex-1 h-full overflow-hidden">
      <app-logo :style="{ height: `${theme.header.height}px` }" />
      <n-scrollbar class="flex-1 overflow-hidden">
        <MixMenuItem
          v-for="menu of menuStore.menus"
          :key="menu.key"
          :item="menu"
          :active-key="activeKey"
          :is-mini="appStore.siderCollapse"
          @change="handleMixMenuChange"
        />
      </n-scrollbar>
      <MixMenuCollapse />
    </div>
    <MixMenuDrawer ref="mixMenuDrawerRef" />
  </DarkModeContainer>
</template>
