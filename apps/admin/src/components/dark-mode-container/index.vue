<script setup lang="ts">
defineOptions({ name: 'DarkModeContainer' })

withDefaults(defineProps<Props>(), {
  inverted: false,
})

interface Props {
  inverted?: boolean
}
</script>

<template>
  <n-layout-header :inverted="inverted" data-name="dark-mode-container">
    <slot />
  </n-layout-header>
</template>
