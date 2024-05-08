<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import VerticalSider from './vertical-sider/index.vue'
import VerticalMixSider from './vertical-mix-sider/index.vue'
import { useThemeStore } from '@/store'

defineOptions({ name: 'AppSider' })

const { theme } = storeToRefs(useThemeStore())

const isVerticalMix = computed(() => theme.value.layout.mode === 'vertical-mix')
</script>

<template>
  <VerticalMixSider v-if="isVerticalMix" class="app-sidebar" />
  <VerticalSider v-else class="app-sidebar" />
</template>

<style scoped lang="scss">
</style>
