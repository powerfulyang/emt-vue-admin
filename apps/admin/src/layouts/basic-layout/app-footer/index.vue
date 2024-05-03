<script setup lang="ts">
import { storeToRefs } from 'pinia'
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
    <span>Copyright ©{{ new Date().getFullYear() }} EMT Admin</span>
  </dark-mode-container>
</template>
