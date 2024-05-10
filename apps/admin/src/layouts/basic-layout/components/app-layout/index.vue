<script setup lang="ts">
import { computed } from 'vue'
import { LAYOUT_MAX_Z_INDEX } from './constants'
import { createLayoutCssVars } from './utils'
import type { LayoutProps } from './typings'

const props = withDefaults(defineProps<LayoutProps>(), {
  mode: 'vertical',
  siderVisible: true,
  siderWidth: 220,
  siderCollapsedWidth: 64,
  fixTop: true,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 48,
  footerVisible: true,
  footerHeight: 48,
  maxZIndex: LAYOUT_MAX_Z_INDEX,
})

const emit = defineEmits<Emits>()
const slots = defineSlots<Slots>()
interface Emits {
  (e: 'click-mobile-sider-mask'): void
}
type SlotFn = (props?: Record<string, unknown>) => any

interface Slots {
  /** 插槽：主体 */
  default?: SlotFn
  /** 插槽：头部 */
  header?: SlotFn
  /** 插槽：页签 */
  tab?: SlotFn
  /** 插槽：侧边栏 */
  sider?: SlotFn
  /** 插槽：底部 */
  footer?: SlotFn
}
const cssVars = computed(() => createLayoutCssVars(props))

const isVertical = computed(() => props.mode === 'vertical')
const isHorizontal = computed(() => props.mode === 'horizontal')

const isWrapperScroll = computed(() => props.scrollMode === 'wrapper')
const isContentScroll = computed(() => props.scrollMode === 'content')

const showSider = computed(
  () => !props.isMobile && !props.contentFull && props.siderVisible && slots.sider,
)
const showMobileSider = computed(() => props.isMobile && props.siderVisible && slots.sider)
const showHeader = computed(() => !props.contentFull && props.headerVisible && slots.header)
const showTab = computed(() => !props.contentFull && props.tabVisible && slots.tab)
const showFooter = computed(() => !props.contentFull && props.footerVisible && slots.footer)

const fixedHeaderAndTab = computed(
  () => props.fixedTop || (isHorizontal.value && isWrapperScroll.value),
)

const footerClass = computed(() => {
  if (showSider.value) {
    return props.siderCollapse ? 'left-gap_collapsed' : 'left-gap'
  }
  return ''
})

function handleClickMask() {
  emit('click-mobile-sider-mask')
}
</script>

<template>
  <n-layout class="relative h-full transition-all-300" :style="cssVars" has-sider>
    <slot v-if="showSider" name="sider" />
    <template v-if="showMobileSider">
      <div
        class="absolute w-0 h-full transition-all-300 layout-mobile-sider" :class="[
          siderCollapse ? 'overflow-hidden' : 'layout-sider',
        ]"
      >
        <slot name="sider" />
      </div>
      <div
        v-show="!siderCollapse"
        class="absolute inset-0 bg-[rgba(0,0,0,0.2)] layout-mobile-sider-mask"
        @click="handleClickMask"
      />
    </template>
    <n-layout
      class="relative"
    >
      <template v-if="showHeader">
        <div class="layout-header relative">
          <slot name="header" />
        </div>
      </template>

      <template v-if="showTab">
        <div
          class="layout-tab relative"
        >
          <slot name="tab" />
        </div>
      </template>

      <n-layout-content
        :native-scrollbar="false"
      >
        <main
          class="transition-all-300"
          :style="{
            height: 'calc(100vh - var(--header-height) - var(--tab-height) - var(--footer-height))',
          }"
        >
          <slot />
        </main>

        <template v-if="showFooter">
          <footer
            class="flex-shrink-0 transition-all-300 layout-footer" :class="[
              footerClass,
              { 'absolute left-0 bottom-0 w-full': fixedFooter },
            ]"
          >
            <slot name="footer" />
          </footer>
        </template>
      </n-layout-content>
      <n-back-top class="z-100" />
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
.layout-sider {
  z-index: var(--sider-z-index);
  width: var(--sider-width);
}
.sider-padding-top {
  padding-top: var(--header-height);
}

.layout-mobile-sider {
  z-index: var(--sider-z-index);
}
.layout-mobile-sider-mask {
  z-index: var(--mobile-sider-z-index);
}

.layout-header {
  z-index: var(--header-z-index);
  height: var(--header-height);
}
.layout-header-placement {
  height: var(--header-height);
}

.layout-tab {
  height: var(--tab-height);
  z-index: var(--tab-z-index);
}
.layout-tab-placement {
  height: var(--tab-height);
}

.layout-footer {
  z-index: var(--footer-z-index);
  height: var(--footer-height);
}
.layout-footer-placement {
  height: var(--footer-height);
}
</style>
