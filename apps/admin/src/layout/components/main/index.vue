<template>
  <router-view>
    <template
      #default="{ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }"
    >
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup>
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import type { VNode } from 'vue';
  import { computed, unref } from 'vue';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';

  defineOptions({
    name: 'MainView',
  });

  defineProps({
    notNeedKey: {
      type: Boolean,
      default: false,
    },
    animate: {
      type: Boolean,
      default: true,
    },
  });

  const { isPageAnimate, pageAnimateType } = useProjectSetting();
  const asyncRouteStore = useAsyncRouteStore();
  // 需要缓存的路由组件
  const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);

  const getTransitionName = computed(() => {
    return unref(isPageAnimate) ? unref(pageAnimateType) : '';
  });
</script>

<style lang="scss" scoped></style>
