<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFullscreen } from '@vueuse/core'
import IconFullscreen from './icon-fullscreen.vue'
import IconFullscreenExit from './icon-fullscreen-exit.vue'
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <HoverContainer
    class="w-40px h-full"
    :tooltip-content="$translate('layout.header.fullSreen.tooltip')"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <IconFullscreenExit v-if="isFullscreen" class="text-18px" />
    <IconFullscreen v-else class="text-18px" />
  </HoverContainer>
</template>
