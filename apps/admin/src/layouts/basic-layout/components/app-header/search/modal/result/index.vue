<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import IconEnter from './icon-enter.vue'
import { type SearchMenuOption, useThemeStore } from '@/store'

interface Props {
  value?: string
  options: SearchMenuOption[]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'update:value', value?: string): void
  (e: 'enter'): void
}

const { theme } = storeToRefs(useThemeStore())

const active = computed({
  get() {
    return props.value
  },
  set(newVal) {
    emit('update:value', newVal)
  },
})

function handleTo() {
  emit('enter')
}

function handleMouseEnter({ key }: SearchMenuOption) {
  active.value = key
}
</script>

<template>
  <n-scrollbar>
    <div class="pb-12px">
      <div
        v-for="item of options"
        :key="item.key"
        :style="{
          background: item.key === active ? theme.primaryColor : '',
          color: item.key === active ? '#fff' : '',
        }"
        class="flex justify-between items-center mt-8px h-56px px-14px rounded-4px bg-#e5e7eb dark:bg-dark cursor-pointer"
        @click="handleTo"
        @mouseenter="handleMouseEnter(item)"
      >
        <component :is="item.icon" v-if="item.icon" />
        <span class="flex-1 ml-5px">{{ item.label }}</span>
        <IconEnter class="icon text-20px p-2px mr-3px" />
      </div>
    </div>
  </n-scrollbar>
</template>
