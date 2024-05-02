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
  <VerticalMixSider v-if="isVerticalMix" class="app-sider" />
  <VerticalSider v-else class="app-sider" />
</template>

<style scoped lang="scss">
.app-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
