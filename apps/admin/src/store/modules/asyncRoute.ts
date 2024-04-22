import { proxy } from '@/trpc/client.ts';
import { arrayToMap } from '@/utils/arrayToTree.ts';
import type { Menu } from '@powerfulyang/server';
import { defineStore } from 'pinia';

export interface IAsyncRouteState {
  menus: Menu[];
  keepAliveComponents: string[];
  isDynamicRouteAdded: boolean;
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
      return this.isDynamicRouteAdded;
    },
  },
  actions: {
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added;
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async fetchMenus() {
      this.menus = await proxy.menu.list.query();
    },
    getMenuMapItem(field?: number | string) {
      const id = typeof field === 'number' ? field : this.getMenuKey(field);
      return arrayToMap(this.menus).get(id!);
    },
    getMenuKey(path?: string) {
      return this.getMenu(path)?.id;
    },
    getMenu(field?: string | number) {
      if (typeof field === 'number') {
        return this.menus.find((item) => item.id === field);
      }
      return this.menus.find((item) => item.path === field);
    },
    getSubMenus(path: string) {
      const id = this.getMenuKey(path);
      return this.getMenuMapItem(id)?.children || [];
    },
  },
});
