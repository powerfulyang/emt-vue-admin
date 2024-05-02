<script setup lang="ts">
export interface Props {
  darkMode?: boolean
  active?: boolean
}

defineProps<Props>()

defineSlots<Slots>()

type SlotFn = () => any

interface Slots {
  icon?: SlotFn
  default?: SlotFn
  close?: SlotFn
}
</script>

<template>
  <div
    class="relative inline-flex justify-center items-center px-5 py-4px whitespace-nowrap cursor-pointer chrome-tab"
    :class="[
      {
        'chrome-tab_dark': darkMode,
        'chrome-tab_active': active,
        'chrome-tab_active_dark': darkMode && active,
      },
    ]"
  >
    <div class="absolute inset-0 -z-1 w-full h-full pointer-events-none chrome-tab__bg">
      <svg class="w-full h-full">
        <defs>
          <symbol id="geometry-left" viewBox="0 0 214 36">
            <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" />
          </symbol>
          <symbol id="geometry-right" viewBox="0 0 214 36">
            <use xlink:href="#geometry-left" />
          </symbol>
          <clipPath>
            <rect width="100%" height="100%" x="0" />
          </clipPath>
        </defs>
        <svg width="51%" height="100%">
          <use xlink:href="#geometry-left" width="214" height="36" fill="currentColor" />
        </svg>
        <g transform="scale(-1, 1)">
          <svg width="51%" height="100%" x="-100%" y="0">
            <use xlink:href="#geometry-right" width="214" height="36" fill="currentColor" />
          </svg>
        </g>
      </svg>
    </div>
    <div class="flex gap-2 items-center px-3 py-2px chrome-tab__main">
      <slot name="icon" />
      <slot />
      <slot name="close" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chrome-tab {
  .chrome-tab__bg {
    color: transparent;
  }
	.chrome-tab__main:hover {
		background-color: var(--primary-color-1);
		@apply rounded-lg;
	}
  :deep(.icon-close):hover {
    font-size: 12px;
    background-color: #9ca3af;
    color: #fff;
  }
  &:hover {
    z-index: 9;
  }
  &.chrome-tab_active {
    z-index: 10;
    color: var(--primary-color);
    .chrome-tab__bg {
      color: var(--primary-color-1);
    }
    :deep(.icon-close):hover {
      background-color: var(--primary-color);
    }
    .chrome-tab-divider {
      opacity: 0;
    }
  }
  &.chrome-tab_dark {
    &:not(.chrome-tab_active_dark) {
      &:hover {
        .chrome-tab__bg {
          color: #333;
        }
      }
    }
    :deep(.icon-close):hover {
      color: #000;
    }
    .chrome-tab-divider {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  &.chrome-tab_active_dark {
    .chrome-tab__bg {
      color: var(--primary-color-2);
    }
  }
}
</style>
