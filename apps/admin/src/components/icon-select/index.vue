<script setup lang="tsx">
  import { iconMap } from '@/utils/arrayToTree.ts';
  import type { SelectProps } from 'naive-ui';

  interface Props extends /*@vue-ignore*/ SelectProps {}

  const props = defineProps<Props>();

  const localIconOptions = Array.from(iconMap.entries()).map(([key, icon]) => ({
    label: () => (
      <div class="flex items-center gap-1">
        {icon()}
        <span>{key}</span>
      </div>
    ),
    value: key,
  }));
</script>

<template>
  <n-select v-bind="props" :options="localIconOptions" />
</template>

<style scoped lang="scss"></style>
