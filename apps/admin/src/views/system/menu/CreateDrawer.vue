<script lang="ts" setup>
  import { proxy } from '@/trpc/client.ts';
  import type { Menu } from '@powerfulyang/server';
  import { useMutation, useQueryClient } from '@tanstack/vue-query';
  import type { FormInst } from 'naive-ui';
  import { useMessage } from 'naive-ui';
  import { reactive, ref } from 'vue';
  import IconSelect from '@/components/icon-select/index.vue';

  const rules = {
    label: {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
    path: {
      required: true,
      message: '请输入路径',
      trigger: 'blur',
    },
  };

  const { title, width } = defineProps({
    title: {
      type: String,
      default: '添加菜单',
    },
    width: {
      type: Number,
      default: 400,
    },
  });

  const message = useMessage();
  const formRef = ref<FormInst>(null!);
  const defaultValueRef = () => ({
    title: '',
    /**
     * 1 target: _self
     * 2 target: _blank
     */
    openType: 1,
    path: '',
    icon: undefined,
    parentId: undefined as number | undefined,
    parentTitle: '',
  });

  const isDrawer = ref(false);
  const formParams = reactive(defaultValueRef());
  const placement = 'right' as const;

  function openDrawer(p?: Pick<Menu, 'id' | 'title'>) {
    isDrawer.value = true;
    if (p) {
      formParams.parentId = p.id;
      formParams.parentTitle = p.title;
    } else {
      formParams.parentId = undefined;
    }
  }

  defineExpose({
    openDrawer,
  });

  function closeDrawer() {
    isDrawer.value = false;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const { parentTitle, ...params } = formParams;
      return proxy.menu.create.mutate(params);
    },
    onSuccess() {
      message.success('添加成功');
      handleReset();
      closeDrawer();
      useQueryClient().invalidateQueries({
        queryKey: ['menus'],
      });
    },
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        mutate();
      }
    });
  }

  function handleReset() {
    formRef.value.restoreValidation();
    Object.assign(formParams, defaultValueRef());
  }
</script>

<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" closable>
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="100"
      >
        <n-form-item label="父菜单" v-if="formParams.parentId">
          <n-text>{{ formParams.parentTitle }}#{{ formParams.parentId }}</n-text>
        </n-form-item>
        <n-form-item label="图标" path="icon">
          <icon-select v-model:value="formParams.icon" />
        </n-form-item>
        <n-form-item label="标题" path="title">
          <n-input placeholder="请输入菜单标题" v-model:value="formParams.title" />
        </n-form-item>
        <n-form-item label="路径" path="path">
          <n-input placeholder="请输入路径" v-model:value="formParams.path" />
        </n-form-item>
        <n-form-item label="打开方式" path="openType">
          <n-radio-group v-model:value="formParams.openType" name="openType">
            <n-space>
              <n-radio :value="1">当前窗口</n-radio>
              <n-radio :value="2">新窗口</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="isPending" @click="formSubmit">提交</n-button>
          <n-button @click="handleReset">重置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
