<script setup lang="ts">
import { EnterOutlined, SearchOutlined } from '@vicons/antd'
import { ArrowDownOutline, ArrowUpOutline } from '@vicons/ionicons5'
import { useEventListener } from '@vueuse/core'
import { pinyin } from 'pinyin-pro'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { iconMap } from '@/utils/arrayToTree.ts'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute.ts'
import { useThemeSetting } from '@/hooks/setting/useThemeSetting.ts'

defineOptions({
  name: 'GlobalSearch',
})

const show = defineModel('show', {
  type: Boolean,
  default: false,
})

const searchValue = ref('')

const asyncRouteStore = useAsyncRouteStore()

const filterMenus = computed(() => {
  return asyncRouteStore.menus.filter((menu) => {
    const trimKeyword = searchValue.value.toLocaleLowerCase().trim()
    const title = menu.title.toLocaleLowerCase()
    const pinyinTitle = pinyin(title, { toneType: 'none', separator: '' })
    return trimKeyword && (title.includes(trimKeyword) || pinyinTitle.includes(trimKeyword))
  })
})

const activeItem = ref(0)

watch(filterMenus, () => {
  activeItem.value = 0
})

const { getAppTheme } = useThemeSetting()

const router = useRouter()

useEventListener('keydown', (e) => {
  const { key } = e
  if (key === 'ArrowDown') {
    e.preventDefault()
    activeItem.value = Math.min(activeItem.value + 1, filterMenus.value.length - 1)
  }
  else if (key === 'ArrowUp') {
    e.preventDefault()
    activeItem.value = Math.max(activeItem.value - 1, 0)
  }
  else if (key === 'Enter') {
    e.preventDefault()
    if (filterMenus.value[activeItem.value]) {
      router.push(filterMenus.value[activeItem.value]!.path)
      show.value = false
    }
  }
})
</script>

<template>
  <n-modal
    v-model:show="show"
    class="w-[500px]"
    :mask-closable="false"
    @after-leave="searchValue = ''"
  >
    <div class="bg-white">
      <n-card title="">
        <n-input
          v-model:value="searchValue"
          size="large"
          placeholder="请输入关键字或拼音搜索菜单"
          clearable
        >
          <template #prefix>
            <n-icon size="18">
              <SearchOutlined />
            </n-icon>
          </template>
        </n-input>
        <div class="max-h-[250px] flex items-center justify-center pt-4">
          <n-empty v-if="!filterMenus.length" />
          <n-scrollbar v-if="filterMenus.length">
            <n-list :show-divider="false" clickable hoverable class="w-full space-y-2">
              <n-list-item
                v-for="(item, idx) in filterMenus"
                :key="item.id"
                class="border border-gray-200 border-solid"
                :style="{
                  backgroundColor: activeItem === idx ? getAppTheme : '',
                  color: activeItem === idx ? '#fff' : '',
                }"
                @click="
                  router.push(item.path);
                  show = false;
                "
              >
                <div class="flex items-center gap-1">
                  <component :is="iconMap.get(item.icon!)" />
                  {{ item.title }}
                </div>
              </n-list-item>
            </n-list>
          </n-scrollbar>
        </div>
      </n-card>
      <div class="h-[44px] flex items-center gap-5 whitespace-nowrap p-4">
        <div class="flex items-center gap-1">
          <n-icon size="18">
            <EnterOutlined />
          </n-icon>
          <span>确认</span>
        </div>
        <div class="flex items-center gap-1">
          <n-icon size="18">
            <ArrowUpOutline />
          </n-icon>
          <n-icon size="18">
            <ArrowDownOutline />
          </n-icon>
          <span>切换</span>
        </div>
        <div class="flex items-center gap-1">
          <span>ESC</span>
          <span>关闭</span>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<style scoped lang="scss"></style>
