<script setup lang="ts">
interface Props {
  showTitle?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center">
    <router-link
      to="/"
      class="flex justify-center items-center w-full h-full"
    >
      <i-fluent-emoji-smiling-cat-with-heart-eyes class="text-3rem pb-2" />
      <n-h2
        v-show="showTitle"
        class="text-4 font-bold transition duration-300 ease-in-out max-w-150px"
      >
        <n-ellipsis>
          {{ $t('system.title') }}
        </n-ellipsis>
      </n-h2>
    </router-link>
  </div>
</template>
