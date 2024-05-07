import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type GlobalThemeOverrides, darkTheme } from 'naive-ui'
import { getThemeColors, initTheme } from './utils'
import type { Settings } from '@/settings'

export const useThemeStore = defineStore('theme-store', () => {
  const theme = ref<Settings>(initTheme())

  const naiveTheme = computed(() => {
    return theme.value.darkMode ? darkTheme : undefined
  })

  const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => {
    const { primaryColor, otherColor } = theme.value
    const themeColors = getThemeColors({
      primary: primaryColor,
      ...otherColor,
    })
    const buttonColors = {
      textColorPrimary: theme.value.darkMode ? '#ddd' : undefined,
      textColorHoverPrimary: theme.value.darkMode ? '#ddd' : undefined,
      textColorPressedPrimary: theme.value.darkMode ? '#ddd' : undefined,
      textColorFocusPrimary: theme.value.darkMode ? '#ddd' : undefined,
      textColorDisabledPrimary: theme.value.darkMode ? '#ddd' : undefined,
    }
    return {
      common: {
        ...themeColors,
      },
      Button: {
        ...buttonColors,
      },
    }
  })

  const setDarkMode = (darkMode: boolean) => {
    theme.value.darkMode = darkMode
  }

  const setFollowSystemTheme = (visible: boolean) => {
    theme.value.followSystemTheme = visible
  }

  const setSiderInverted = (isInverted: boolean) => {
    theme.value.sider.inverted = isInverted
  }

  const setHeaderInverted = (isInverted: boolean) => {
    theme.value.header.inverted = isInverted
  }

  const setFooterInverted = (inverted: boolean) => {
    theme.value.footer.inverted = inverted
  }

  const setLayoutMode = (mode: Settings['layout']['mode']) => {
    theme.value.layout.mode = mode
  }

  const setPrimaryColor = (primaryColor: string) => {
    theme.value.primaryColor = primaryColor
    if (!theme.value.isCustomizeInfoColor) {
      theme.value.otherColor.info = primaryColor
    }
  }

  const setScrollMode = (mode: Settings['scrollMode']) => {
    theme.value.scrollMode = mode
  }

  const setIsFixedHeaderAndTab = (isFixed: boolean) => {
    theme.value.fixedHeaderAndTab = isFixed
  }

  const setHorizontalMenuPosition = (position: Settings['menu']['horizontalPosition']) => {
    theme.value.menu.horizontalPosition = position
  }

  const setHeaderHeight = (height: number | null) => {
    if (height) {
      theme.value.header.height = height
    }
  }

  const setTabHeight = (height: number | null) => {
    if (height) {
      theme.value.tab.height = height
    }
  }

  const setTabIsCache = (isCache: boolean) => {
    theme.value.tab.isCache = isCache
  }

  const setSiderWidth = (width: number | null) => {
    if (width) {
      theme.value.sider.width = width
    }
  }

  const setMixSiderWidth = (width: number | null) => {
    if (width) {
      theme.value.sider.mixWidth = width
    }
  }

  const setFooterVisible = (isVisible: boolean) => {
    theme.value.footer.visible = isVisible
  }

  const setFooterIsFixed = (isFixed: boolean) => {
    theme.value.footer.fixed = isFixed
  }

  const setHeaderCrumbVisible = (visible: boolean) => {
    theme.value.header.crumb.visible = visible
  }

  const setHeaderCrumbIconVisible = (visible: boolean) => {
    theme.value.header.crumb.showIcon = visible
  }

  const setTabVisible = (visible: boolean) => {
    theme.value.tab.visible = visible
  }

  const setTabMode = (mode: Settings['tab']['mode']) => {
    theme.value.tab.mode = mode
  }

  const setPageIsAnimate = (animate: boolean) => {
    theme.value.page.animate = animate
  }

  const pageAnimateMode = computed(() => {
    const { page } = theme.value
    return page.animate ? page.animateMode : undefined
  })
  const setPageAnimateMode = (mode: Settings['page']['animateMode']) => {
    theme.value.page.animateMode = mode
  }

  const reset = () => {
    theme.value = initTheme()
    setDarkMode(theme.value.darkMode)
  }

  return {
    theme,
    naiveTheme,
    naiveThemeOverrides,
    setDarkMode,
    setFollowSystemTheme,
    setSiderInverted,
    setHeaderInverted,
    setFooterInverted,
    setLayoutMode,
    setPrimaryColor,
    setScrollMode,
    setIsFixedHeaderAndTab,
    setHorizontalMenuPosition,
    setHeaderHeight,
    setTabHeight,
    setTabIsCache,
    setSiderWidth,
    setMixSiderWidth,
    setFooterVisible,
    setFooterIsFixed,
    setHeaderCrumbVisible,
    setHeaderCrumbIconVisible,
    setTabVisible,
    setTabMode,
    setPageIsAnimate,

    pageAnimateMode,
    setPageAnimateMode,

    reset,
  }
})
