<script lang="ts" setup>
import type { VNode } from 'vue'
import { computed, unref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useProjectSetting } from '@/hooks/useProjectSetting.ts'

defineOptions({
  name: 'MainView',
})

defineProps({
  notNeedKey: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: Boolean,
    default: true,
  },
})

const { isPageAnimate, pageAnimateType } = useProjectSetting()
const asyncRouteStore = useAsyncRouteStore()
// 需要缓存的路由组件
const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents)

const getTransitionName = computed(() => {
  return unref(isPageAnimate) ? unref(pageAnimateType) : ''
})
</script>

<template>
  <router-view>
    <template
      #default="{ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }"
    >
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<style lang="scss" scoped></style>
