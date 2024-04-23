import { acceptHMRUpdate, defineStore } from 'pinia'
import designSetting from '@/settings/themeSetting.ts'

const { darkTheme, appTheme, appThemeList } = designSetting

interface ThemeSettingState {
  // 深色主题
  darkTheme: boolean
  // 系统风格
  appTheme: string
  // 系统内置风格
  appThemeList: string[]
}

export const useThemeSettingStore = defineStore({
  id: 'app-theme-setting',
  state: (): ThemeSettingState => ({
    darkTheme,
    appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    },
  },
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeSettingStore, import.meta.hot))
}
