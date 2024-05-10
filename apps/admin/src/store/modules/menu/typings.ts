import type { VNode } from 'vue'

/**
 * 菜单
 */
export interface MenuOption {
  key: string
  label: string
  routePath: string
  icon?: () => VNode
  children?: MenuOption[]
}

/**
 * 搜索菜单
 */
export interface SearchMenuOption {
  key: string
  label: string
  routePath: string
  icon?: () => import('vue').Component
}
