<script setup lang="ts">
import { type Component, computed } from 'vue'
import { storeToRefs } from 'pinia'
import ChromeTab from './chrome-tab.vue'
import ButtonTab from './button-tab.vue'
import { MenuIcons } from '@/constants'
import type { Settings } from '@/settings'
import { addColorAlpha, transformColorWithOpacity } from '@/utils'
import { useThemeStore } from '@/store'

type TabMode = Settings['tab']['mode']

interface Props {
  mode?: TabMode
  darkMode?: boolean
  icon?: string
  title?: string
  active?: boolean
  closeable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'chrome',
  closeable: true,
})

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'close'): void
}

type Components = Record<TabMode, Component>

const activeTab = computed(() => {
  const components: Components = {
    chrome: ChromeTab,
    button: ButtonTab,
  }
  return components[props.mode]
})

const { theme } = storeToRefs(useThemeStore())

const cssVars = computed(() => {
  const primaryColor = theme.value.primaryColor
  return {
    '--primary-color': primaryColor,
    '--primary-color-1': transformColorWithOpacity(primaryColor, 0.1, '#fff'),
    '--primary-color-2': transformColorWithOpacity(primaryColor, 0.3, '#000'),
    '--primary-color-opacity-1': addColorAlpha(primaryColor, 0.1),
    '--primary-color-opacity-2': addColorAlpha(primaryColor, 0.15),
    '--primary-color-opacity-3': addColorAlpha(primaryColor, 0.3),
  }
})
</script>

<template>
  <component
    :is="activeTab"
    :dark-mode="props.darkMode"
    :active="props.active"
    :style="cssVars"
    @close="emit('close')"
  >
    <template #icon>
      <n-icon class="text-lg">
        <component :is="MenuIcons[icon]" v-if="icon" />
      </n-icon>
    </template>
    <slot>
      {{ $tt(title) }}
    </slot>
    <template #close>
      <div
        v-if="closeable"
        class="relative inline-flex justify-center items-center w-4 h-4 rd-50% icon-close"
        @click.stop="emit('close')"
      >
        <i-mdi-close />
      </div>
    </template>
  </component>
</template>
