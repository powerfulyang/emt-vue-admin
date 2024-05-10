<script setup lang="ts">
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import type { MessageTab } from './typings'
import MessageList from './message-list/index.vue'
import { useMobile } from '@/hooks'
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

const { isMobile } = useMobile()

const tabData = ref<MessageTab[]>([
  {
    key: 1,
    name: $t('layout.header.notifications.tabs.title.notice'),
    badgeProps: { type: 'warning' },
    list: Array.from({ length: 5 }).map(() => {
      return {
        id: faker.number.int(),
        icon: 'notification',
        description: faker.lorem.lines(2),
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
    }),
  },
  {
    key: 2,
    name: $t('layout.header.notifications.tabs.title.message'),
    badgeProps: { type: 'error' },
    list: Array.from({ length: 5 }).map(() => {
      return {
        id: faker.number.int(),
        icon: 'message',
        title: faker.lorem.slug(),
        description: faker.lorem.lines(2),
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
    }),
  },
  {
    key: 3,
    name: $t('layout.header.notifications.tabs.title.todo'),
    badgeProps: { type: 'info' },
    list: [
      {
        id: 1,
        icon: 'todo',
        title: 'i18n',
        description: '关于项目 i18n 的重新设计',
        date: '2024-05-06',
        tagTitle: '进行中',
        tagProps: { type: 'info' },
      },
    ],
  },
])

const count = computed(() => {
  return tabData.value.reduce((count, cur) => {
    return count + cur.list.filter(item => !item.isRead).length
  }, 0)
})

const currentTab = ref(0)

const loading = ref(false)

const currentList = computed({
  get() {
    return tabData.value[currentTab.value]?.list
  },
  set(newVal) {
    tabData.value[currentTab.value]!.list = newVal!
  },
})

function handleRead(index: number) {
  currentList.value![index]!.isRead = true
}

const showAction = computed(() => currentList.value!.length > 0)

function handleClear() {
  currentList.value = []
}

function handleAllRead() {
  for (const item of currentList.value!) {
    item.isRead = true
  }
}

function handleLoadMore() {
  loading.value = true
  setTimeout(() => {
    currentList.value!.push(...currentList.value!)
    loading.value = false
  }, 1000)
}
</script>

<template>
  <n-popover class="!p-0" trigger="click" placement="bottom">
    <template #trigger>
      <hover-container
        class="relative w-10 h-full text-xl"
        :tooltip-content="$t('layout.header.notifications.tooltip')"
        :inverted="theme.header.inverted"
      >
        <i-mdi-notifications />
        <n-badge
          :value="count"
          :max="99"
          class="absolute top-2 -right-2"
        />
      </hover-container>
    </template>
    <n-tabs
      v-model:value="currentTab"
      type="line"
      justify-content="space-evenly"
      :class="[isMobile ? 'w-276px' : 'w-360px']"
    >
      <n-tab-pane v-for="(item, index) of tabData" :key="item.key" class="!p-0" :name="index">
        <template #tab>
          <div class="flex justify-center items-center" :class="[isMobile ? 'w-92px' : 'w-120px']">
            <span class="mr-5px">{{ item.name }}</span>
            <n-badge
              v-bind="item.badgeProps"
              show-zero
              :value="item.list.filter((message) => !message.isRead).length"
              :max="99"
            />
          </div>
        </template>
        <loading-empty
          class="h-360px"
          placeholder-class="bg-$n-color transition-background-color duration-300 ease-in-out"
          :loading="loading"
          :empty="item.list.length === 0"
        >
          <MessageList :list="item.list" @read="handleRead" />
        </loading-empty>
      </n-tab-pane>
    </n-tabs>
    <div v-if="showAction" class="flex border-t border-$n-divider-color cursor-pointer">
      <div class="flex-1 text-center py-10px" @click="handleClear">
        {{ $t('layout.header.notifications.tabs.action.clear') }}
      </div>
      <div
        class="flex-1 text-center py-10px border-l border-$n-divider-color"
        @click="handleAllRead"
      >
        {{ $t('layout.header.notifications.tabs.action.allRead') }}
      </div>
      <div
        class="flex-1 text-center py-10px border-l border-$n-divider-color"
        @click="handleLoadMore"
      >
        {{ $t('layout.header.notifications.tabs.action.loadMore') }}
      </div>
    </div>
  </n-popover>
</template>
