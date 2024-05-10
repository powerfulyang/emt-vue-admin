<script setup lang="ts">
import Modal from './modal/index.vue'
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

const modalRef = ref<InstanceType<typeof Modal>>()

function handleSearch() {
  modalRef.value?.show()
}
</script>

<template>
  <hover-container
    class="w-10 h-full text-xl"
    :tooltip-content="$t('layout.header.search.tooltip')"
    :inverted="theme.header.inverted"
    @click="handleSearch"
  >
    <i-mdi-search />
    <Modal ref="modalRef" />
  </hover-container>
</template>
