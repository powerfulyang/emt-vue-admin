<script lang="ts" setup>
  import IconSelect from '@/components/icon-select/index.vue';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute.ts';
  import { proxy } from '@/trpc/client.ts';
  import { arrayToMenuTree } from '@/utils/arrayToTree.ts';
  import CreateDrawer from '@/views/system/menu/CreateDrawer.vue';
  import type { Menu } from '@powerfulyang/server';
  import { useMutation } from '@tanstack/vue-query';
  import { AlignLeftOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@vicons/antd';
  import type { FormInst, TreeOption } from 'naive-ui';
  import { useDialog, useMessage } from 'naive-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed, reactive, ref, unref } from 'vue';

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

  const formRef = ref<FormInst>(null!);
  const createDrawerRef = ref<{
    openDrawer: (p?: Pick<Menu, 'id' | 'title'>) => void;
  }>(null!);
  const message = useMessage();
  const dialog = useDialog();

  let expandedKeys = ref<Array<string | number>>([]);

  const isEditMenu = ref(false);
  const treeItemTitle = ref('');
  const pattern = ref('');
  const drawerTitle = ref('');

  const getInitialRef = () => ({
    title: '',
    path: '',
    openType: 1,
    id: 0,
    icon: undefined,
  });

  const formParams = reactive(getInitialRef());

  function addMenu(key: string) {
    if (key === 'menu') {
      drawerTitle.value = '添加菜单';
      openCreateDrawer();
    } else {
      drawerTitle.value = `添加子菜单`;
      openCreateDrawer(formParams);
    }
  }

  function openCreateDrawer(p?: Pick<Menu, 'id' | 'title'>) {
    const { openDrawer } = createDrawerRef.value;
    openDrawer(p);
  }

  const nodeProps = ({
    option,
  }: {
    option: TreeOption;
  }): HTMLAttributes & Record<string, unknown> => {
    return {
      onClick() {
        isEditMenu.value = true;
        const menu = asyncRoute.getMenu(option.key);
        Object.assign(formParams, menu);
      },
      onDblclick() {
        // 展开或者收起
        if (option.children) {
          const index = expandedKeys.value.findIndex((item) => item === option.key);
          if (index === -1) {
            expandedKeys.value.push(option.key!);
          } else {
            expandedKeys.value.splice(index, 1);
          }
        }
      },
    };
  };

  function handleDel() {
    dialog.info({
      title: '提示',
      content: `您确定想删除此权限吗?`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        message.success('删除成功');
      },
      onNegativeClick: () => {
        message.error('已取消');
      },
    });
  }

  function handleReset() {
    formRef.value.restoreValidation();
    Object.assign(formParams, getInitialRef());
  }

  const { isPending, mutate } = useMutation({
    mutationFn() {
      return proxy.menu.update.mutate(formParams);
    },
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        mutate();
      } else {
        message.error('请填写完整信息');
      }
    });
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = [];
    } else {
      expandedKeys.value = unref(asyncRoute.menus)?.map((item) => item.id) || [];
    }
  }

  const asyncRoute = useAsyncRouteStore();

  const treeData = computed(() => {
    return arrayToMenuTree(asyncRoute.menus) as TreeOption[];
  });
</script>

<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="菜单权限管理">
        菜单权限管理，可以对菜单进行增删改查操作
      </n-card>
    </div>
    <n-grid class="mt-4" cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <n-gi span="1">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-button type="info" ghost icon-placement="left" @click="addMenu('menu')">
                添加菜单
                <template #icon>
                  <n-icon size="14">
                    <PlusOutlined />
                  </n-icon>
                </template>
              </n-button>
              <n-button type="info" ghost icon-placement="left" @click="packHandle">
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined />
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>
          <div class="w-full menu">
            <n-input v-model:value="pattern" placeholder="输入菜单名称搜索">
              <template #suffix>
                <n-icon size="18" class="cursor-pointer">
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <n-tree
                block-line
                cascade
                :virtual-scroll="true"
                :pattern="pattern"
                :data="treeData"
                :expandedKeys="expandedKeys"
                @update-expanded-keys="expandedKeys = $event"
                style="max-height: 650px; overflow: hidden"
                selectable
                :node-props="nodeProps"
              />
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-flex>
              <n-space align="center">
                <FormOutlined class="w-5" />
                <span>编辑菜单{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
              </n-space>
              <n-button v-if="isEditMenu" text type="primary" @click="addMenu('sub-menu')"
                >添加子菜单</n-button
              >
            </n-flex>
          </template>
          <n-alert type="info" closable> 从菜单列表选择一项后，进行编辑</n-alert>
          <n-form
            :model="formParams"
            :rules="rules"
            ref="formRef"
            label-placement="left"
            :label-width="100"
            v-if="isEditMenu"
            class="py-4"
          >
            <n-form-item label="图标" path="icon">
              <icon-select v-model:value="formParams.icon" />
            </n-form-item>
            <n-form-item label="标题" path="title">
              <n-input placeholder="请输入标题" v-model:value="formParams.title" />
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
            <n-form-item path="auth" style="margin-left: 100px">
              <n-space>
                <n-button type="primary" :loading="isPending" @click="formSubmit"
                  >保存修改</n-button
                >
                <n-button @click="handleReset">重置</n-button>
                <n-button type="error" @click="handleDel">删除</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
    <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
  </div>
</template>
