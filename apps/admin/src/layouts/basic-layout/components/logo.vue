<script setup lang="ts">
import { useThemeStore } from '@/store'

interface Props {
  showTitle?: boolean
}

defineProps<Props>()

const { theme } = storeToRefs(useThemeStore())
</script>

<template>
  <dark-mode-container class="flex items-center" :inverted="theme.sider.inverted">
    <router-link
      to="/"
      class="flex justify-center items-center w-full whitespace-nowrap overflow-hidden"
    >
      <i-fluent-emoji-smiling-cat-with-heart-eyes class="text-3rem pb-2" />
      <h2
        v-show="showTitle"
        class="text-16px font-bold transition duration-300 ease-in-out"
      >
        {{ $translate('system.title') }}
      </h2>
    </router-link>
  </dark-mode-container>
</template>
