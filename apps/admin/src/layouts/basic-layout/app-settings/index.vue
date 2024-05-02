<script setup lang="ts">
import { ref } from 'vue'
import IconClose from './icon-close.vue'
import IconSetting from './icon-setting.vue'
import ThemeMode from './theme-mode/index.vue'
import LayoutMode from './layout-mode.vue'
import ColorSelect from './color-select/index.vue'
import PageFunc from './page-func.vue'
import PageView from './page-view.vue'
import ThemeConfig from './theme-config/index.vue'
import { $translate } from '@/locales'

defineOptions({ name: 'AppSetting' })

const visible = ref(false)
</script>

<template>
  <n-button
    type="primary"
    class="fixed top-360px right-14px z-10000 w-42px h-42px !p-0 transition-all duration-300" :class="[
      { '!right-330px': visible },
      visible ? 'ease-out' : 'ease-in',
    ]"
    @click="visible = !visible"
  >
    <IconClose v-if="visible" class="text-24px" />
    <IconSetting v-else class="text-24px" />
  </n-button>
  <n-drawer display-directive="show" :show="visible" :width="330" @mask-click="visible = false">
    <n-drawer-content :title="$translate('layout.settings.title')" :native-scrollbar="false">
      <ThemeMode />
      <LayoutMode />
      <ColorSelect />
      <PageFunc />
      <PageView />
      <ThemeConfig />
    </n-drawer-content>
  </n-drawer>
</template>
