<script setup lang="ts">
import { computed } from 'vue'
import { type PopoverPlacement, useThemeVars } from 'naive-ui'

defineOptions({ name: 'HoverContainer' })

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
})

interface Props {
  tooltipContent?: string
  placement?: PopoverPlacement
  contentClass?: string
  inverted?: boolean
}

const themeVars = useThemeVars()

const contentClassName = computed(
  () =>
    `${props.contentClass ?? ''} ${
      props.inverted ? 'hover:bg-[var(--primary-color)]' : 'hover:bg-#f6f6f6'
    }`,
)
</script>

<template>
  <div v-if="tooltipContent">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div
          class="flex justify-center items-center h-full cursor-pointer dark:hover:bg-#333" :class="[
            contentClassName,
          ]"
        >
          <slot />
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div
    v-else
    class="flex justify-center items-center cursor-pointer dark:hover:bg-#333" :class="[
      contentClassName,
    ]"
    :style="{ '--primary-color': themeVars.primaryColor }"
  >
    <slot />
  </div>
</template>
