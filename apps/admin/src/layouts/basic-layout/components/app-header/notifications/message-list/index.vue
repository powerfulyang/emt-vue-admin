<script setup lang="tsx">
import type { Component } from 'vue'
import { useThemeVars } from 'naive-ui'
import type { MessageList } from '../typings'

interface Props {
  list?: MessageList[]
}

withDefaults(defineProps<Props>(), {
  list: () => [],
})

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'read', val: number): void
}

const themeVars = useThemeVars()

type Components = Record<string, Component>

const iconComponents: Components = {
  notification: <i-mdi-notifications-none />,
  message: <i-mdi-message-processing-outline />,
  todo: <i-mdi-todo-auto />,
}

function handleRead(index: number) {
  emit('read', index)
}
</script>

<template>
  <n-scrollbar class="max-h-360px">
    <n-list hoverable clickable>
      <n-list-item
        v-for="(item, index) in list"
        :key="item.id"
        class="cursor-pointer !rounded-none"
        @click="handleRead(index)"
      >
        <n-thing :class="[{ 'opacity-30': item.isRead }]">
          <template #avatar>
            <component
              :is="iconComponents[item.icon]"
              v-if="item.icon"
              class="text-8 text-[var(--primary-color)]"
            />
          </template>
          <template #header>
            <n-ellipsis v-if="item.title" :line-clamp="1">
              {{ item.title }}
              <template #tooltip>
                {{ item.title }}
              </template>
            </n-ellipsis>
          </template>
          <template v-if="item.tagTitle" #header-extra>
            <n-tag v-bind="item.tagProps" size="small">
              {{ item.tagTitle }}
            </n-tag>
          </template>
          <template #description>
            <n-ellipsis v-if="item.description" :line-clamp="2">
              {{ item.description }}
            </n-ellipsis>
            <p>{{ item.date }}</p>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-scrollbar>
</template>
