import { computed } from 'vue';
import { useThemeSettingStore } from '@/store/modules/themeSetting.ts';

export function useThemeSetting() {
  const themeStore = useThemeSettingStore();

  const getDarkTheme = computed(() => themeStore.darkTheme);

  const getAppTheme = computed(() => themeStore.appTheme);

  const getAppThemeList = computed(() => themeStore.appThemeList);

  return {
    getDarkTheme,
    getAppTheme,
    getAppThemeList,
  };
}
