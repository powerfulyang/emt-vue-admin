<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import type { WritableComputedRef } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Lang } from '@/locales'
import { subscribeStore, useThemeStore } from '@/store'
import { useThemeSettingStore } from '@/store/modules/themeSetting.ts'
import { lighten } from '@/utils/lignten.ts'

const themeStore = useThemeSettingStore()

const { locale } = useI18n()

const naiveLocale = computed(() => {
  return (locale as WritableComputedRef<Lang>).value === 'zhCN' ? zhCN : null
})

const naiveDateLocale = computed(() => {
  return (locale as WritableComputedRef<Lang>).value === 'zhCN' ? dateZhCN : null
})

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

subscribeStore()

const getThemeOverrides = computed(() => {
  const appTheme = themeStore.appTheme
  const lightenStr = lighten(themeStore.appTheme, 6)
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  }
})

const getDarkTheme = computed(() => (themeStore.darkTheme ? darkTheme : undefined))
</script>

<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<style scoped></style>
