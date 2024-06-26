import { acceptHMRUpdate, defineStore } from 'pinia'
import { arrayToMap } from '@/utils/arrayToTree.ts'

export interface Menu {
  id: number
  title: string
  icon: string | null
  order: number
  path: string
  openType: number
  parentId: number | null
  children?: Menu[]
}

export interface IAsyncRouteState {
  menus: Menu[]
  keepAliveComponents: string[]
  isDynamicRouteAdded: boolean
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicRouteAdded: false,
  }),
  getters: {
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames
    },
    async fetchMenus() {
      this.menus = [
        {
          id: 1,
          title: '系统设置',
          icon: 'setting',
          order: 0,
          path: '/system',
          openType: 1,
          parentId: null,
        },
        {
          id: 2,
          title: '菜单管理',
          icon: null,
          order: 0,
          path: '/system/menu',
          openType: 1,
          parentId: 1,
        },
      ]
    },
    getMenuMapItem(field?: number | string) {
      const id = typeof field === 'number' ? field : this.getMenuKey(field)
      return arrayToMap(this.menus).get(id!)
    },
    getMenuKey(path?: string) {
      return this.getMenu(path)?.id
    },
    getMenu(field?: string | number) {
      if (typeof field === 'number') {
        return this.menus.find(item => item.id === field)
      }
      return this.menus.find(item => item.path === field)
    },
    getSubMenus(path: string) {
      const id = this.getMenuKey(path)
      return this.getMenuMapItem(id)?.children || []
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAsyncRouteStore, import.meta.hot),
  )
}
