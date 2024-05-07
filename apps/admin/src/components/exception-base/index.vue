<script setup lang="ts">
import IconNoPermission from './icon-no-permission.vue'
import IconNotFound from './icon-not-found.vue'
import IconServiceError from './icon-service-error.vue'

defineOptions({ name: 'ExceptionBase' })

defineProps<Props>()

type ExceptionType = '403' | '404' | '500'

interface Props {
  type: ExceptionType
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-24px min-h-520px w-full h-full overflow-hidden"
  >
    <div class="flex">
      <IconNoPermission v-if="type === '403'" />
      <IconNotFound v-if="type === '404'" />
      <IconServiceError v-if="type === '500'" />
    </div>
    <router-link :to="{ name: 'Root' }">
      <n-button type="primary">
        回到首页
      </n-button>
    </router-link>
  </div>
</template>
