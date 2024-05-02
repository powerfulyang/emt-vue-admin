<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFullscreen } from '@vueuse/core'
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <hover-container
    class="w-10 h-full text-xl"
    :tooltip-content="$translate('layout.header.fullSreen.tooltip')"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <i-mdi-fullscreen-exit v-if="isFullscreen" />
    <i-mdi-fullscreen v-else />
  </hover-container>
</template>
