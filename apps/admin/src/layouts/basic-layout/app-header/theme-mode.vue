<script setup lang="ts">
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <hover-container
    class="w-10 h-full text-xl"
    :tooltip-content="$t('layout.header.themeMode.tooltip')"
    :inverted="theme.header.inverted"
  >
    <dark-mode-switch
      v-model:dark="theme.darkMode"
      class="w-full h-full"
    />
  </hover-container>
</template>
