<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconSunny from './icon-sunny.vue'
import IconMoon from './icon-moon.vue'
import IconNotDisturb from './icon-not-disturb.vue'
import IconHdrAuto from './icon-hdr-auto.vue'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <n-divider title-placement="center">
    {{ $t('layout.settings.themeMode.title') }}
  </n-divider>
  <n-space vertical size="large">
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.themeMode.darkMode') }}</span>
      <n-switch :value="theme.darkMode" @update:value="themeStore.setDarkMode">
        <template #checked>
          <IconSunny class="text-14px text-white" />
        </template>
        <template #unchecked>
          <IconMoon class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.themeMode.followSystemTheme') }}</span>
      <n-switch :value="theme.followSystemTheme" @update:value="themeStore.setFollowSystemTheme">
        <template #checked>
          <IconNotDisturb class="text-14px text-white" />
        </template>
        <template #unchecked>
          <IconHdrAuto class="text-14px text-white" />
        </template>
      </n-switch>
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.themeMode.siderInverted') }}</span>
      <n-switch :value="theme.sider.inverted" @update:value="themeStore.setSiderInverted" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.themeMode.headerInverted') }}</span>
      <n-switch :value="theme.header.inverted" @update:value="themeStore.setHeaderInverted" />
    </div>
    <div class="flex justify-between items-center">
      <span>{{ $t('layout.settings.themeMode.footerInverted') }}</span>
      <n-switch :value="theme.footer.inverted" @update:value="themeStore.setFooterInverted" />
    </div>
  </n-space>
</template>
