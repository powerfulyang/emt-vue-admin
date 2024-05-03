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
  <n-layout-footer
    class="flex justify-center items-center h-full"
    :inverted="theme.footer.inverted"
  >
    <span>Copyright ©2023 Vue Naive Admin</span>
  </n-layout-footer>
</template>
