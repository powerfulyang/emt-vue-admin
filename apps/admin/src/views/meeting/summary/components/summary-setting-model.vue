<script setup lang="ts">
  import { getInitialValue, storageKey } from '@/form/summary-setting-model.ts';
  import { reactive } from 'vue';

  const { show } = defineProps({
    show: Boolean,
  });

  const emit = defineEmits(['update:show']);

  const formValue = reactive(getInitialValue());

  const onPositiveClick = () => {
    localStorage.setItem(storageKey, JSON.stringify(formValue));
  };
  const onNegativeClick = () => {
    Object.assign(formValue, getInitialValue());
  };
</script>

<template>
  <n-modal
    :show="show"
    @update:show="emit('update:show', $event)"
    :mask-closable="false"
    preset="dialog"
    title="设置"
    positive-text="确认"
    negative-text="取消"
    @close="onNegativeClick"
    @positive-click="onPositiveClick"
  >
    <n-p depth="3"> 会议纪要生成设置，设置后会影响会议纪要生成的结果。 </n-p>
    <n-form label-placement="left">
      <n-form-item label="是否语篇规整" path="is_correct_text">
        <n-switch v-model:value="formValue.is_correct_text" />
      </n-form-item>
      <n-form-item label="是否区分发言人" path="identify_speakers">
        <n-switch v-model:value="formValue.identify_speakers" />
      </n-form-item>
      <n-form-item
        v-show="formValue.identify_speakers"
        label="是否需要发言人总结"
        path="speaker_summary_needed"
      >
        <n-switch v-model:value="formValue.speaker_summary_needed" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped lang="scss"></style>
