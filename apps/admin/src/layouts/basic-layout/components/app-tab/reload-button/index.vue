<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { HoverContainer } from '@/components'

const route = useRoute()
const appStore = useAppStore()
const loading = ref(false)

function handleRefresh() {
  const key = route.name as string
  loading.value = true
  appStore.reloadPage(key)
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <HoverContainer
    tooltip-content="重新加载"
    placement="bottom-end"
    class="w-12 h-full"
    @click="handleRefresh"
  >
    <i-mdi-refresh class="text-22px" :class="[{ 'animate-spin': loading }]" />
  </HoverContainer>
</template>
