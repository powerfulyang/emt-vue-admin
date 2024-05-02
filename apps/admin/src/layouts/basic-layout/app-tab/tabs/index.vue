<script setup lang="ts">
import PageTab from './page-tab/index.vue'
import ContextMenu from './context-menu/index.vue'
import { type MultiTab, useRouteStore, useTabStore, useThemeStore } from '@/store'

interface Emits {
  (e: 'scroll', clientX: number): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const routeStore = useRouteStore()
const { theme } = storeToRefs(useThemeStore())
const tabStore = useTabStore()

const isChromeMode = computed(() => theme.value.tab.mode === 'chrome')

function closeable(tab: MultiTab) {
  return tab.key !== routeStore.rootRoute.name
}

interface ContextMenuProps {
  visible?: boolean
  tab?: MultiTab
  closable?: boolean
  x?: number
  y?: number
}
const contextMenuProps = ref<ContextMenuProps>({})

function handleClick(tab: MultiTab) {
  router.push(tab.routePath)
}

function handleClose(tab: MultiTab) {
  tabStore.removeTab(tab)
}

function handleContextMenu(e: MouseEvent, tab: MultiTab) {
  const duration = contextMenuProps.value.visible ? 150 : 0
  setTimeout(() => {
    contextMenuProps.value.visible = true
    contextMenuProps.value.tab = tab
    contextMenuProps.value.closable = closeable(tab)
    contextMenuProps.value.x = e.clientX
    contextMenuProps.value.y = e.clientY
  }, duration)
}

function handleDropdownVisible(visible: boolean) {
  contextMenuProps.value.visible = visible
}

const tabRef = ref<InstanceType<typeof PageTab>[]>()

watch(
  () => tabStore.activeTab,
  (activeTab) => {
    nextTick(() => {
      const activeTabIndex = tabStore.tabs.findIndex(({ key }) => key === activeTab?.key)
      if (tabRef.value && tabRef.value.length) {
        const activeEl = tabRef.value[activeTabIndex]!.$el as HTMLDivElement
        const { x, width } = activeEl.getBoundingClientRect()
        const clientX = x + width / 2
        emit('scroll', clientX)
      }
    })
  },
)

// 前后一个 divider 隐藏
function shouldHidden(i: number) {
  return i === tabStore.tabs.length - 1 || tabStore.activeIndex === i || tabStore.activeIndex === i + 1
}
</script>

<template>
  <div class="flex h-full" :class="[isChromeMode ? 'items-end px-6' : 'items-center gap-2 px-4']">
    <div
      v-for="(tab, index) in tabStore.tabs"
      :key="tab.key"
      class="flex items-center relative"
      :class="[isChromeMode ? '-ml-4' : '']"
    >
      <PageTab
        ref="tabRef"
        :mode="theme.tab.mode"
        :dark-mode="theme.darkMode"
        :icon="tab.icon"
        :title="tab.title"
        :active="tabStore.activeTab?.key === tab.key"
        :closeable="closeable(tab)"
        @click="handleClick(tab)"
        @close="handleClose(tab)"
        @contextmenu.prevent="handleContextMenu($event, tab)"
      />
      <n-divider v-if="isChromeMode && !shouldHidden(index)" vertical class="absolute right-0" />
    </div>
  </div>
  <ContextMenu v-bind="contextMenuProps" @update:visible="handleDropdownVisible" />
</template>
