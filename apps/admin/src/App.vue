<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
import type { WritableComputedRef } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Lang } from '@/locales'
import { subscribeStore, useThemeStore } from '@/store'

const { locale } = useI18n()

const naiveLocale = computed(() => {
  return (locale as WritableComputedRef<Lang>).value === 'zhCN' ? zhCN : null
})

const naiveDateLocale = computed(() => {
  return (locale as WritableComputedRef<Lang>).value === 'zhCN' ? dateZhCN : null
})

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

subscribeStore()
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
