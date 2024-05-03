<script setup lang="ts">
import { computed } from 'vue'
import { LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID } from './constants'
import { createLayoutCssVars } from './utils'
import type { LayoutProps } from './typings'

const props = withDefaults(defineProps<LayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollElId: LAYOUT_SCROLL_EL_ID,
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

const siderClass = computed(() => {
  if (props.mode === 'horizontal') {
    return 'sider-padding-top'
  }
  return ''
})

const headerClass = computed(() => {
  if (isVertical.value && showSider.value) {
    return props.siderCollapse ? 'left-gap_collapsed' : 'left-gap'
  }
  return ''
})

const tabClass = computed(() => {
  if (showSider.value) {
    return props.siderCollapse ? 'left-gap_collapsed' : 'left-gap'
  }
  return ''
})

const _contentClass = computed(() => {
  if (showSider.value) {
    return props.siderCollapse ? 'left-gap_collapsed' : 'left-gap'
  }
  return ''
})

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
  <n-layout class="relative h-full transition-all-300" :style="cssVars">
    <div
      :id="isWrapperScroll ? scrollElId : undefined"
      class="flex flex-col h-full transition-all-300" :class="[
        {
          'overflow-y-auto': isWrapperScroll,
        },
      ]"
    >
      <aside
        v-if="showSider"
        class="absolute left-0 top-0 h-full transition-all-300 layout-sider" :class="[
          siderClass,
          {
            collapsed: siderCollapse,
          },
        ]"
      >
        <slot name="sider" />
      </aside>

      <template v-if="showMobileSider">
        <aside
          class="absolute left-0 top-0 w-0 h-full bg-white transition-all-300 layout-mobile-sider" :class="[
            siderCollapse ? 'overflow-hidden' : 'layout-sider',
          ]"
        >
          <slot name="sider" />
        </aside>
        <div
          v-show="!siderCollapse"
          class="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.2)] layout-mobile-sider-mask"
          @click="handleClickMask"
        />
      </template>

      <template v-if="showHeader">
        <header
          class="flex-shrink-0 layout-header transition-all-300" :class="[
            headerClass,
            { 'absolute top-0 left-0 w-full': fixedHeaderAndTab },
          ]"
        >
          <slot name="header" />
        </header>
        <div
          v-show="fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden layout-header-placement"
        />
      </template>

      <template v-if="showTab">
        <div
          class="flex-shrink-0 transition-all-300 layout-tab" :class="[
            { 'top-0!': !showHeader },
            tabClass,
            { 'absolute left-0 w-full': fixedHeaderAndTab },
          ]"
        >
          <slot name="tab" />
        </div>
        <div
          v-show="fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden layout-tab-placement"
        />
      </template>

      <main
        :id="isContentScroll ? scrollElId : undefined"
        class="flex flex-col flex-grow transition-all-300" :class="[
          contentClass,
          _contentClass,
          { 'overflow-y-auto': isContentScroll },
        ]"
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
        <div
          v-show="fixedFooter"
          class="flex-shrink-0 overflow-hidden layout-footer-placement"
        />
      </template>
    </div>
  </n-layout>
</template>

<style scoped lang="scss">
.layout-sider {
  z-index: var(--sider-z-index);
  width: var(--sider-width);
  &.collapsed {
    width: var(--sider-collapsed-width);
  }
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

.left-gap {
  padding-left: var(--sider-width);
}
.left-gap_collapsed {
  padding-left: var(--sider-collapsed-width);
}

.layout-header {
  z-index: var(--header-z-index);
  height: var(--header-height);
}
.layout-header-placement {
  height: var(--header-height);
}

.layout-tab {
  top: var(--header-height);
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
