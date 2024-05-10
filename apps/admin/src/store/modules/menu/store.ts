import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { transformMenus, transformSearchMenus } from './utils'
import type { MenuOption, RouteData } from '@/store'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<MenuOption[]>([])

  const reset = () => {
    menus.value = []
  }

  const setMenus = (routeData: RouteData[]) => {
    menus.value = transformMenus(routeData)
  }

  const searchMenus = computed(() => transformSearchMenus(menus.value ?? []))

  return {
    menus,
    reset,
    setMenus,
    searchMenus,
  }
})
