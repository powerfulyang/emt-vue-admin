<script setup lang="tsx">
import type { DropdownOption } from 'naive-ui'
import { useUserStore } from '@/store/modules/user.ts'
import { useAuthStore, useThemeStore } from '@/store'

const authStore = useAuthStore()
const userStore = useUserStore()
const { theme } = storeToRefs(useThemeStore())

const options = computed<DropdownOption[]>(() => [
  {
    label: $tt('layout.header.user.dropdown.accountSettings'),
    key: 'user-center',
    icon: () => (
      <n-icon size="18">
        <i-mdi-user-outline />
      </n-icon>
    ),
  },
  { type: 'divider', key: 'divider' },
  {
    label: $tt('layout.header.user.dropdown.logout'),
    key: 'logout',
    icon: () => (
      <n-icon size="18">
        <i-mdi-logout />
      </n-icon>
    )
    ,
  },
])

function handleDropdown(optionKey: string) {
  if (optionKey === 'logout') {
    window.$dialog.info({
      title: $tt('layout.header.user.logoutDialog.title'),
      content: $tt('layout.header.user.logoutDialog.content'),
      positiveText: $tt('layout.header.user.logoutDialog.action.confirm'),
      negativeText: $tt('layout.header.user.logoutDialog.action.cancel'),
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
