<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { Settings } from '@/settings'
import type { OptionWithKey } from '@/utils'
import { useThemeStore } from '@/store'

type TabMode = Settings['tab']['mode']

type PageAnimateMode = Settings['page']['animateMode']

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const tabModeList = computed<OptionWithKey<TabMode>[]>(() => [
  {
    value: 'chrome',
    label: $t('layout.settings.pageView.tabMode.chrome'),
  },
  {
    value: 'button',
    label: $t('layout.settings.pageView.tabMode.button'),
  },
])

const pageAnimateModeList = computed<OptionWithKey<PageAnimateMode>[]>(() => [
  {
    value: 'fade-slide',
    label: $t('layout.settings.pageView.pageAnimateMode.fadeSlide'),
  },
  {
    value: 'fade',
    label: $t('layout.settings.pageView.pageAnimateMode.fade'),
  },
  {
    value: 'fade-bottom',
    label: $t('layout.settings.pageView.pageAnimateMode.fadeBottom'),
  },
  {
    value: 'fade-scale',
    label: $t('layout.settings.pageView.pageAnimateMode.fadeScale'),
  },
  {
    value: 'zoom-fade',
    label: $t('layout.settings.pageView.pageAnimateMode.zoomFade'),
  },
  {
    value: 'zoom-out',
    label: $t('layout.settings.pageView.pageAnimateMode.zoomOut'),
  },
])
</script>

<template>
  <n-divider title-placement="center">
    {{ $t('layout.settings.pageView.title') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.pageView.headerCrumb') }}</span>
      <n-switch
        :value="theme.header.crumb.visible"
        @update:value="themeStore.setHeaderCrumbVisible"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.pageView.headerCrumbIcon') }}</span>
      <n-switch
        :value="theme.header.crumb.showIcon"
        @update:value="themeStore.setHeaderCrumbIconVisible"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.pageView.tab') }}</span>
      <n-switch :value="theme.tab.visible" @update:value="themeStore.setTabVisible" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.pageView.tabMode.title') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.tab.mode"
        :options="tabModeList"
        @update:value="themeStore.setTabMode"
      />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.pageView.pageAnimate') }}</span>
      <n-switch :value="theme.page.animate" @update:value="themeStore.setPageIsAnimate" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.pageView.pageAnimateMode.title') }}</span>
      <n-select
        class="w-120px"
        size="small"
        :value="theme.page.animateMode"
        :options="pageAnimateModeList"
        @update:value="themeStore.setPageAnimateMode"
      />
    </div>
  </n-space>
</template>
