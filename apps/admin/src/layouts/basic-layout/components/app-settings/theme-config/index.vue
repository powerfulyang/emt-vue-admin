<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import { useClipboard } from '@vueuse/core'
import IconSuccess from './icon-success.vue'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const { copy, isSupported } = useClipboard()

async function handleCopy() {
  if (!isSupported) {
    return window.$message.error('您的浏览器不支持 Clipboard API')
  }
  await copy(JSON.stringify(theme.value, null, '\t'))
  window.$dialog.info({
    title: window.$t('layout.settings.themeConfig.operateSuccess'),
    content: window.$t('layout.settings.themeConfig.copySuccess'),
    positiveText: window.$t('layout.settings.themeConfig.confirmCopy'),
    icon: () => h(IconSuccess),
  })
}

function handleResetConfig() {
  themeStore.reset()
  window.$message.success(window.$t('layout.settings.themeConfig.resetSuccess'))
}
</script>

<template>
  <n-divider title-placement="center">
    {{ $t('layout.settings.themeConfig.title') }}
  </n-divider>
  <n-space vertical>
    <n-button type="primary" block @click="handleCopy">
      {{ $t('layout.settings.themeConfig.copy') }}
    </n-button>
    <n-button type="warning" block @click="handleResetConfig">
      {{ $t('layout.settings.themeConfig.reset') }}
    </n-button>
  </n-space>
</template>
