<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { getBreadcrumbsNyRouteName } from './helper'
import { useMenuStore, useThemeStore } from '@/store'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const { theme } = storeToRefs(useThemeStore())

const breadcrumbs = computed(() => {
  return getBreadcrumbsNyRouteName(route.name as string, menuStore.menus)
})

function handleDropdownSelect(key: string) {
  router.push({ name: key })
}
</script>

<template>
  <n-breadcrumb class="px-2">
    <n-breadcrumb-item v-for="breadcrumb of breadcrumbs" :key="breadcrumb.key">
      <n-dropdown
        v-if="breadcrumb.children && breadcrumb.children.length"
        :options="breadcrumb.children"
        @select="handleDropdownSelect"
      >
        <div class="flex gap-4px items-center">
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon && breadcrumb.icon"
            class="text-lg"
          />
          <span>
            {{ $tt(breadcrumb.label) }}
          </span>
        </div>
      </n-dropdown>
      <template v-else>
        <div class="flex gap-4px items-center">
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon && breadcrumb.icon"
            :class="[
              { 'text-#BBBBBB': theme.header.inverted },
            ]"
            class="text-lg"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">
            {{ $tt(breadcrumb.label) }}
          </span>
        </div>
      </template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
