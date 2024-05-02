<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ScreenLock from '@/components/screen-lock/index.vue'
import { useThemeSettingStore } from '@/store/modules/themeSetting.ts'
import { useScreenLockStore } from '@/store/modules/screenLock.ts'
import { lighten } from '@/utils/lignten.ts'

const themeStore = useThemeSettingStore()

const getThemeOverrides = computed(() => {
  const appTheme = themeStore.appTheme
  const lightenStr = lighten(themeStore.appTheme, 6)
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  }
})

const getDarkTheme = computed(() => (themeStore.darkTheme ? darkTheme : undefined))

const useScreenLock = useScreenLockStore()

const isLock = computed(() => useScreenLock.isLocked)
const lockTime = computed(() => useScreenLock.lockTime)

let timer: number
const route = useRoute()
function timekeeping() {
  clearInterval(timer)
  if (route.name === 'login' || isLock.value) {
    return
  }
  // 设置不锁屏
  useScreenLock.setLock(false)
  // 重置锁屏时间
  useScreenLock.setLockTime()
  timer = window.setInterval(() => {
    // 锁屏倒计时递减
    useScreenLock.setLockTime(lockTime.value - 1)
    if (lockTime.value <= 0) {
      // 设置锁屏
      useScreenLock.setLock(true)
      return clearInterval(timer)
    }
  }, 1000)
}

onMounted(() => {
  document.addEventListener('mousedown', timekeeping)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', timekeeping)
})
</script>

<template>
  <n-config-provider
    abstract
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
  >
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>

  <transition v-if="isLock && $route.name !== '//login/'" name="slide-up">
    <ScreenLock />
  </transition>
</template>

<style scoped></style>
