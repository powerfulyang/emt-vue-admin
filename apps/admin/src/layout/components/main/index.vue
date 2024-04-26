<script lang="ts" setup>
import { computed, unref } from 'vue'
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
      #default="{ Component, route }"
    >
      <transition :name="getTransitionName" mode="out-in" appear>
        <div>
          <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </router-view>
</template>

<style lang="scss" scoped></style>
