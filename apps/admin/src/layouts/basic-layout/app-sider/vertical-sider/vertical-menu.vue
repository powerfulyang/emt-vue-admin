<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { MenuOption as NaiveMenuOption } from 'naive-ui'
import { getActiveKeyPathsOfMenus } from '../hepler'
import { isExternal } from '@/utils'
import { type MenuOption, useAppStore, useMenuStore, useThemeStore } from '@/store'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()
const { theme } = storeToRefs(useThemeStore())

const activeKey = computed(() => (route.meta.activeMenu ?? route.name) as string)
const expandedKeys = ref<string[]>()

function handleUpdateMenu(key: string, item: NaiveMenuOption) {
  const { routePath } = item as MenuOption
  if (isExternal(routePath)) {
    window.open(routePath, '_blank')
  }
  else {
    router.push({ name: key })
  }
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menuStore.menus)
  },
)
</script>

<template>
  <n-scrollbar class="flex-1 overflow-hidden">
    <n-menu
      :value="activeKey"
      :options="menuStore.menus"
      :collapsed="appStore.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :expanded-keys="expandedKeys"
      :indent="18"
      :inverted="theme.sider.inverted || theme.darkMode"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>
