<script setup lang="ts">
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

function handleClickLink() {
  window.open('https://github.com/powerfulyang/emt-vue-admin', '_blank')
}
</script>

<template>
  <hover-container
    class="w-10 h-full text-xl"
    :tooltip-content="$translate('layout.header.githubSite.tooltip')"
    :inverted="theme.header.inverted"
    @click="handleClickLink"
  >
    <i-mdi-github />
  </hover-container>
</template>
