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
        <span>
          <component
            :is="breadcrumb.icon"
            v-if="theme.header.crumb.showIcon && breadcrumb.icon"
            class="inline-block mr-4px text-lg"
          />
          <span class="align-bottom">{{ breadcrumb.label }}</span>
        </span>
      </n-dropdown>
      <template v-else>
        <component
          :is="breadcrumb.icon"
          v-if="theme.header.crumb.showIcon && breadcrumb.icon"
          class="inline-block mr-4px text-lg" :class="[
            { 'text-#BBBBBB': theme.header.inverted },
          ]"
        />
        <span class="align-bottom" :class="{ 'text-#BBBBBB': theme.header.inverted }">
          {{ breadcrumb.label }}
        </span>
      </template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
