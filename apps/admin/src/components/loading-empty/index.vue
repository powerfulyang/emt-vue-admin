<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useThemeVars } from 'naive-ui'
import { IconEmptyData, IconNetworkError } from './icons'
import { NETWORK_ERROR_MSG } from '@/utils'

defineOptions({ name: 'LoadingEmptyWrapper' })

const props = withDefaults(defineProps<Props>(), {
  loadingSize: 'small',
  placeholderClass: 'bg-white dark:bg-dark transition-background-color duration-300 ease-in-out',
  emptyDesc: '暂无数据',
  iconClass: 'text-320px text-[var(--primary-color)]',
  descClass: 'text-16px text-#666',
})

interface Props {
  loading: boolean
  empty?: boolean
  loadingSize?: 'small' | 'medium' | 'large'
  placeholderClass?: string
  emptyDesc?: string
  iconClass?: string
  descClass?: string
  showNetworkReload?: boolean
}

const themeVars = useThemeVars()

const network = ref(window.navigator.onLine)

const reloadFlag = ref(true)

const isEmpty = computed(() => props.empty && !props.loading && network.value)

const showPlaceholder = computed(() => props.loading || isEmpty.value || !network.value)

const networkErrorDesc = computed(() =>
  props.showNetworkReload ? `${NETWORK_ERROR_MSG}，点击重试` : NETWORK_ERROR_MSG,
)

function handleReload() {
  if (!props.showNetworkReload) {
    return
  }
  reloadFlag.value = false
  nextTick(() => {
    reloadFlag.value = true
  })
}

watch(
  () => props.loading,
  (newVal) => {
    if (!newVal) {
      network.value = window.navigator.onLine
    }
  },
)
</script>

<template>
  <div v-if="reloadFlag" class="relative" :style="{ '--primary-color': themeVars.primaryColor }">
    <slot />
    <div
      v-show="showPlaceholder"
      class="absolute left-0 top-0 w-full h-full" :class="[placeholderClass]"
    >
      <div
        v-show="loading"
        class="absolute left-0 top-0 flex justify-center items-center w-full h-full"
      >
        <n-spin :size="loadingSize" />
      </div>
      <div
        v-show="isEmpty"
        class="absolute left-0 top-0 flex justify-center items-center w-full h-full"
      >
        <div class="relative w-full">
          <IconEmptyData :class="iconClass" />
          <p class="absolute left-0 bottom-0 w-full text-center" :class="[descClass]">
            {{ emptyDesc }}
          </p>
        </div>
      </div>
      <div
        v-show="!network"
        class="absolute left-0 top-0 flex justify-center items-center w-full h-full"
      >
        <div
          class="relative w-full" :class="[{ 'cursor-pointer': showNetworkReload }]"
          @click="handleReload"
        >
          <IconNetworkError :class="iconClass" />
          <p class="absolute left-0 bottom-0 w-full text-center" :class="descClass">
            {{ networkErrorDesc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
