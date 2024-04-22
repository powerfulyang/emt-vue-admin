import { useThemeSettingStore } from '@/store/modules/themeSetting.ts';
import { lighten } from '@/utils/lignten.ts';
import * as NaiveUI from 'naive-ui';
import { computed } from 'vue';

/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * https://www.naiveui.com/zh-CN/dark/components/discrete
 */

export function setupNaiveDiscreteApi() {
  const themeStore = useThemeSettingStore();

  const configProviderPropsRef = computed(() => ({
    theme: themeStore.darkTheme ? NaiveUI.darkTheme : undefined,
    themeOverrides: {
      common: {
        primaryColor: themeStore.appTheme,
        primaryColorHover: lighten(themeStore.appTheme, 6),
        primaryColorPressed: lighten(themeStore.appTheme, 6),
      },
      LoadingBar: {
        colorLoading: themeStore.appTheme,
      },
    },
  }));
  const { message, dialog, notification, loadingBar } = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef,
    }
  );

  window.$message = message;
  window.$dialog = dialog;
  window.$notification = notification;
  window.$loading = loadingBar;
}
