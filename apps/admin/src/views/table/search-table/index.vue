<script setup lang="tsx">
import { ref } from 'vue'
import { apiUrl, proxy } from '@/trpc/client.ts'
import { ProTable, type ProTableColumn } from '@/components'

const tableRef = ref<InstanceType<typeof ProTable>>()

const checked = ref([])

function renderToolbar() {
  return (
    <n-space>
      <n-button
        type="primary"
        onClick={() => {
          $dialog.error({
            title: '删除数据',
            content: '确定清空所有数据吗？',
            negativeText: '取消',
            positiveText: '确认',
            onPositiveClick: async () => {
              await proxy.truncate.mutate()
              tableRef.value?.reload()
            },
          })
        }}
      >
        清空数据
      </n-button>
    </n-space>
  )
}

type Col = (Awaited<ReturnType<typeof proxy.listAssets.query>>)[number]

const columns = ref<ProTableColumn<Col>[]>([
  {
    type: 'selection',
  },
  { key: 'name', title: '名称' },
  { key: 'mime', title: '类型' },
  {
    key: 'createdAt',
    title: '创建时间',
    valueType: 'datetime',
  },
  {
    key: 'updatedAt',
    title: '更新时间',
    valueType: 'datetime',
  },
])

async function methodRequest() {
  const result = await proxy.listAssets.query()
  return { itemCount: result.length, data: result }
}
</script>

<template>
  <div>
    <n-upload
      class="mb-4"
      directory-dnd
      accept="image/*,video/*,audio/*"
      list-type="image"
      name="asset"
      :action="`${apiUrl}/uploadAsset`"
      @finish="tableRef?.reload()"
    >
      <n-upload-dragger class="p-8">
        <div>
          点击或拖拽文件到此处上传
        </div>
      </n-upload-dragger>
    </n-upload>
    <ProTable
      ref="tableRef"
      v-model:checked-row-keys="checked"
      header-title="查询表格"
      :render-toolbar="renderToolbar"
      :columns="columns"
      :request="methodRequest"
    />
  </div>
</template>
