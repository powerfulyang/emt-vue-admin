<script lang="ts" setup>
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { localStg } from '@/utils'
import { type Lang, setLocale } from '@/locales'
import { useThemeStore } from '@/store'

interface Props {
  withHoverContainer?: boolean
  containerClass?: string
}

defineProps<Props>()

const { theme } = storeToRefs(useThemeStore())

const language = ref<Lang>(localStg.get('lang') ?? 'zhCN')

const options: DropdownMixedOption[] = [
  { label: '中文', key: 'zhCN' },
  { label: 'English', key: 'enUS' },
]

function handleSelect(key: Lang) {
  language.value = key
  setLocale(key)
  localStg.set('lang', key)
}
</script>

<template>
  <n-dropdown trigger="hover" :options="options" :value="language" @select="handleSelect">
    <hover-container
      v-if="withHoverContainer"
      class="w-10 h-full text-xl"
      :class="[containerClass]"
      :inverted="theme.header.inverted"
    >
      <i-mdi-language />
    </hover-container>
    <div v-else class="cursor-pointer p11px" :class="[containerClass]">
      <i-mdi-language />
    </div>
  </n-dropdown>
</template>
