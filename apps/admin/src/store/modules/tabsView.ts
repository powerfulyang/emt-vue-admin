import { defineStore } from 'pinia';

export type RouteItem = {
  fullPath: string;
  path: string;
  title?: string | symbol | null;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

//保留固定路由
function retainAffixRoute(list: any[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes: RouteItem[]) {
      // 初始化标签页
      this.tabsList = routes;
    },
    addTab(route: RouteItem): boolean {
      // 添加标签页
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(route: RouteItem) {
      // 关闭左侧
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList = this.tabsList.filter((_, i) => i >= index);
    },
    closeRightTabs(route: RouteItem) {
      // 关闭右侧
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList = this.tabsList.filter((_, i) => i <= index);
    },
    closeOtherTabs(route: RouteItem) {
      // 关闭其他
      this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath);
    },
    closeCurrentTab(route: RouteItem) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // 关闭全部
      this.tabsList = retainAffixRoute(this.tabsList);
    },
  },
});
