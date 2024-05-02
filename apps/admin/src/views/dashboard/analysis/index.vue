<script lang="ts" setup>
import TopChart from './top-chart.vue'
import DataCard from './data-card/index.vue'
import BottomPart from './bottom-part.vue'
</script>

<template>
  <n-space vertical :size="16">
    <TopChart />
    <DataCard />
    <BottomPart />
  </n-space>
</template>
