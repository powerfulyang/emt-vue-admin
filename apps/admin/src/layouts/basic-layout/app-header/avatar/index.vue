<script setup lang="ts">
import { computed, h } from 'vue'
import { storeToRefs } from 'pinia'
import type { DropdownOption } from 'naive-ui'
import IconUserAvatar from './icon-user-avatar.vue'
import IconLogout from './icon-logout.vue'
import { useUserStore } from '@/store/modules/user.ts'
import { useAuthStore, useThemeStore } from '@/store'

const authStore = useAuthStore()
const userStore = useUserStore()
const { theme } = storeToRefs(useThemeStore())

const options = computed<DropdownOption[]>(() => [
  {
    label: $translate('layout.header.user.dropdown.userCenter'),
    key: 'user-center',
    icon: () => h(IconUserAvatar),
  },
  { type: 'divider', key: 'divider' },
  {
    label: $translate('layout.header.user.dropdown.logout'),
    key: 'logout',
    icon: () => h(IconLogout),
  },
])

function handleDropdown(optionKey: string) {
  if (optionKey === 'logout') {
    window.$dialog.info({
      title: $translate('layout.header.user.logoutDialog.title'),
      content: $translate('layout.header.user.logoutDialog.content'),
      positiveText: $translate('layout.header.user.logoutDialog.action.confirm'),
      negativeText: $translate('layout.header.user.logoutDialog.action.cancel'),
      onPositiveClick: () => {
        authStore.logout()
      },
    })
  }
}
</script>

<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="ml-4 px-2 gap-2" :inverted="theme.header.inverted">
      <n-avatar :src="userStore.getUserInfo.avatar" />
      <n-ellipsis line-clamp="1" class="flex-1">
        {{ userStore.getUserInfo?.realName }}
      </n-ellipsis>
    </hover-container>
  </n-dropdown>
</template>
