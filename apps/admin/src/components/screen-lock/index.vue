<script lang="ts" setup>
import {
  ApiOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
  LockOutlined,
  UserOutlined,
  WifiOutlined,
} from '@vicons/antd'
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import recharge from './recharge.vue'
import { useBattery } from '@/hooks/useBattery'
import { useOnline } from '@/hooks/useOnline'
import { useTime } from '@/hooks/useTime'
import { useScreenLockStore } from '@/store/modules/screenLock'
import type { UserInfoType } from '@/store/modules/user'
import { useUserStore } from '@/store/modules/user'

defineOptions({
  name: 'ScreenLock',
})

const useScreenLock = useScreenLockStore()
const userStore = useUserStore()

// 获取时间
const { month, day, hour, minute, week } = useTime()
const { online } = useOnline()

const router = useRouter()
const route = useRoute()

const { battery, batteryStatus, calcDischargingTime, calcChargingTime } = useBattery()
const userInfo: UserInfoType = userStore.getUserInfo || {}
const username = userInfo.name || ''
const state = reactive({
  showLogin: false,
  loginLoading: false, // 正在登录
  isLoginError: false, // 密码错误
  errorMsg: '密码错误',
  loginParams: {
    username: username || '',
    password: '',
  },
})

const { showLogin, isLoginError, loginLoading, loginParams, errorMsg } = toRefs(state)

// 解锁登录
const onLockLogin = (value: boolean) => (state.showLogin = value)

// 登录
async function onLogin() {
  if (!state.loginParams.password.trim()) {
    return
  }
  state.loginLoading = true
  const { code, result } = await userStore.login()
  if (code === 200) {
    onLockLogin(false)
    useScreenLock.setLock(false)
  }
  else {
    state.errorMsg = result.token
    state.isLoginError = true
  }
  state.loginLoading = false
}

// 重新登录
function goLogin() {
  onLockLogin(false)
  useScreenLock.setLock(false)
  router.replace({
    path: '/login',
    query: {
      redirect: route.fullPath,
    },
  })
}
</script>

<template>
  <div
    :class="{ onLockLogin: showLogin }"
    class="lockscreen"
    @keyup="onLockLogin(true)"
    @mousedown.stop
    @contextmenu.prevent
  >
    <template v-if="!showLogin">
      <div class="lock-box">
        <div class="lock">
          <span class="lock-icon" title="解锁屏幕" @click="onLockLogin(true)">
            <n-icon>
              <LockOutlined />
            </n-icon>
          </span>
        </div>
      </div>
      <!-- 充电 -->
      <recharge
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
        :calc-charging-time="calcChargingTime"
      />

      <div class="local-time">
        <div class="time">
          {{ hour }}:{{ minute }}
        </div>
        <div class="date">
          {{ month }}月{{ day }}号，星期{{ week }}
        </div>
      </div>
      <div class="computer-status">
        <span :class="{ offline: !online }" class="network">
          <WifiOutlined class="network" />
        </span>
        <ApiOutlined />
      </div>
    </template>

    <!-- 登录 -->
    <template v-if="showLogin">
      <div class="login-box">
        <n-avatar :size="128">
          <n-icon>
            <UserOutlined />
          </n-icon>
        </n-avatar>
        <div class="username">
          {{ loginParams.username }}
        </div>
        <n-input
          v-model:value="loginParams.password"
          type="password"
          autofocus
          placeholder="请输入登录密码"
          @keyup.enter="onLogin"
        >
          <template #suffix>
            <n-icon style="cursor: pointer" @click="onLogin">
              <LoadingOutlined v-if="loginLoading" />
              <ArrowRightOutlined v-else />
            </n-icon>
          </template>
        </n-input>

        <div v-if="isLoginError" class="flex w-full">
          <span class="text-red-500">{{ errorMsg }}</span>
        </div>

        <div class="flex justify-around w-full mt-1">
          <div><a @click="showLogin = false">返回</a></div>
          <div><a @click="goLogin">重新登录</a></div>
          <div><a @click="onLogin">进入系统</a></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .lockscreen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    background: #000;
    color: white;
    overflow: hidden;
    z-index: 9999;

    &.onLockLogin {
      background-color: rgba(25, 28, 34, 0.88);
      backdrop-filter: blur(7px);
    }

    .login-box {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > * {
        margin-bottom: 14px;
      }

      .username {
        font-size: 30px;
      }
    }

    .lock-box {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 34px;
      z-index: 100;

      .tips {
        color: white;
        cursor: text;
      }

      .lock {
        display: flex;
        justify-content: center;

        .lock-icon {
          cursor: pointer;

          .anticon-unlock {
            display: none;
          }

          &:hover .anticon-unlock {
            display: initial;
          }

          &:hover .anticon-lock {
            display: none;
          }
        }
      }
    }

    .local-time {
      position: absolute;
      bottom: 60px;
      left: 60px;
      font-family: helvetica, serif;

      .time {
        font-size: 70px;
      }

      .date {
        font-size: 40px;
      }
    }

    .computer-status {
      position: absolute;
      bottom: 60px;
      right: 60px;
      font-size: 24px;

      > * {
        margin-left: 14px;
      }

      .network {
        position: relative;

        &.offline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 28px;
          transform: translate(-50%, -50%) rotate(45deg);
          background-color: red;
          z-index: 10;
        }
      }
    }
  }
</style>
