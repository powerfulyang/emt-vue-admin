<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { websiteConfig } from '@/config/website.config.ts'
import { useThemeStore } from '@/store'

defineOptions(
  {
    name: 'AppFooter',
  },
)

const { theme } = storeToRefs(useThemeStore())
</script>

<template>
  <dark-mode-container
    class="flex justify-center items-center h-full"
    :inverted="theme.footer.inverted"
  >
    <span>Copyright ©{{ new Date().getFullYear() }} {{ websiteConfig.siteName }}</span>
  </dark-mode-container>
</template>
