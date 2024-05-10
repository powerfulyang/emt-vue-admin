<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { MenuOption as NaiveMenuOption } from 'naive-ui'
import { isExternal } from '@/utils'
import { type MenuOption, useMenuStore, useThemeStore } from '@/store'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const { theme } = storeToRefs(useThemeStore())

const activeKey = computed(() => (route.meta.activeMenu ?? route.name) as string)

function handleUpdateMenu(key: string, item: NaiveMenuOption) {
  const { routePath } = item as MenuOption
  if (isExternal(routePath)) {
    window.open(routePath, '_blank')
  }
  else {
    router.push({ name: key })
  }
}
</script>

<template>
  <div class="flex-1">
    <n-scrollbar :x-scrollable="true" content-class="h-full">
      <div
        class="flex items-center h-full"
        :style="{ justifyContent: theme.menu.horizontalPosition }"
      >
        <n-menu
          :value="activeKey"
          :options="menuStore.menus"
          :inverted="theme.header.inverted || theme.darkMode"
          mode="horizontal"
          class="!w-auto"
          @update:value="handleUpdateMenu"
        />
      </div>
    </n-scrollbar>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
</style>
