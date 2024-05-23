<script setup lang="ts">
import { h, ref } from 'vue'
import { NButton } from 'naive-ui'
import { proxy } from '@/trpc/client.ts'
import { ProTable, type ProTableColumn } from '@/components'

const tableRef = ref<InstanceType<typeof ProTable>>()

function renderToolbar() {
  return h(
    NButton,
    { type: 'primary' },
    () => '新 建',
  )
}

const columns = ref<ProTableColumn<any>[]>([
  { type: 'selection', fixed: 'left' },

  { key: 'remark', title: '备注', hideInSearch: true, fixed: 'right' },

])

async function methodRequest() {
  const result = await proxy.listAssets.query()
  return { itemCount: result.length, data: result }
}
</script>

<template>
  <div>
    <ProTable
      ref="tableRef"
      header-title="查询表格"
      :render-toolbar="renderToolbar"
      :columns="columns"
      :request="methodRequest"
      :scroll-x="1200"
    />
  </div>
</template>
