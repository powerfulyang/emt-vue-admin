import { acceptHMRUpdate, defineStore } from 'pinia'
import projectSetting from '@/settings/projectSetting'
import type {
  ICrumbsSetting,
  IHeaderSetting,
  IMenuSetting,
  IMultiTabsSetting,
} from '@/types/config'

const {
  navMode,
  navTheme,
  isMobile,
  headerSetting,
  showFooter,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
} = projectSetting

interface ProjectSettingState {
  // 左侧菜单模式 顶部菜单模式 左侧分级菜单模式 顶部混合菜单模式
  navMode: 'vertical' | 'horizontal' | 'vertical-step' | 'mix' // 导航模式
  navTheme: string // 导航风格
  headerSetting: IHeaderSetting // 顶部设置
  showFooter: boolean // 页脚
  menuSetting: IMenuSetting // 多标签
  multiTabsSetting: IMultiTabsSetting // 多标签
  crumbsSetting: ICrumbsSetting // 面包屑
  permissionMode: string // 权限模式
  isPageAnimate: boolean // 是否开启路由动画
  pageAnimateType: string // 路由动画类型
  isMobile: boolean // 是否处于移动端模式
}

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    isMobile,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode
    },
    getNavTheme(): string {
      return this.navTheme
    },
    getIsMobile(): boolean {
      return this.isMobile
    },
    getHeaderSetting(): object {
      return this.headerSetting
    },
    getShowFooter(): boolean {
      return this.showFooter
    },
    getMenuSetting(): object {
      return this.menuSetting
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting
    },
    getCrumbsSetting(): object {
      return this.crumbsSetting
    },
    getPermissionMode(): string {
      return this.permissionMode
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate
    },
    getPageAnimateType(): string {
      return this.pageAnimateType
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(
      useProjectSettingStore,
      import.meta.hot,
    ),
  )
}
