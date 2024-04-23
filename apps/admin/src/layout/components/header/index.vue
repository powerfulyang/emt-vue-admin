<script lang="ts" setup>
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GithubOutlined,
  LockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@vicons/antd'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useDialog, useMessage } from 'naive-ui'
import { computed, markRaw, reactive, ref, toRefs, unref } from 'vue'
import type { RouteLocationMatched, RouteRecordRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { logicOr } from '@vueuse/math'
import { websiteConfig } from '@/config/website.config'
import { useProjectSetting } from '@/hooks/useProjectSetting.ts'
import AsideMenu from '@/layout/components/menu/index.vue'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute.ts'
import { useScreenLockStore } from '@/store/modules/screenLock'
import { useUserStore } from '@/store/modules/user'
import { TABS_ROUTES } from '@/store/mutation-types'
import ProjectSetting from '@/layout/components/header/project-setting.vue'

defineOptions({
  name: 'PageHeader',
})

const props = defineProps({
  inverted: {
    type: Boolean,
  },
})

const collapsed = defineModel('collapsed', {
  type: Boolean,
})

const userStore = useUserStore()
const useLockscreen = useScreenLockStore()
const message = useMessage()
const dialog = useDialog()
const { navMode, navTheme, headerSetting, menuSetting, crumbsSetting } = useProjectSetting()

const { name } = userStore?.info || {}

const drawerSetting = ref()

const state = reactive({
  username: name ?? '',
  fullscreenIcon: markRaw(FullscreenOutlined),
  navMode,
  navTheme,
  headerSetting,
  crumbsSetting,
})

const { fullscreenIcon, username } = toRefs(state)

const getInverted = computed(() => {
  return ['light', 'header-dark'].includes(unref(navTheme)) ? props.inverted : !props.inverted
})

const mixMenu = computed(() => {
  return unref(menuSetting).mixMenu
})
computed(() => {
  const { minMenuWidth, menuWidth } = unref(menuSetting)
  return {
    left: collapsed.value ? `${minMenuWidth}px` : `${menuWidth}px`,
    width: `calc(100% - ${collapsed.value ? `${minMenuWidth}px` : `${menuWidth}px`})`,
  }
})

const getMenuLocation = computed(() => {
  return 'header'
})

const router = useRouter()
const route = useRoute()

const asyncRoute = useAsyncRouteStore()

function generator(routerMap: RouteLocationMatched[] | RouteRecordRaw[]) {
  return routerMap
    .filter(item => asyncRoute.getMenu(item.path))
    .map((item) => {
      const currentMenu = asyncRoute.getMenuMapItem(item.path)!
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        // Recursion
        currentMenu.children = asyncRoute.getSubMenus(item.path)
      }
      return currentMenu
    })
}

const breadcrumbList = computed(() => {
  return generator(route.matched)
})

function dropdownSelect(key: number) {
  const menu = asyncRoute.getMenu(key)!
  router.push(menu.path)
}

// 刷新页面
function reloadPage() {
  router.push({
    path: `/redirect${unref(route).fullPath}`,
  })
}

// 退出登录
function doLogout() {
  dialog.info({
    title: '提示',
    content: '您确定要退出登录吗',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      userStore.logout().then(() => {
        message.success('成功退出登录')
        // 移除标签页
        localStorage.removeItem(TABS_ROUTES)
        router
          .replace({
            name: 'Login',
            query: {
              redirect: route.fullPath,
            },
          })
          .finally(() => location.reload())
      })
    },
    onNegativeClick: () => {},
  })
}

// 切换全屏图标
function toggleFullscreenIcon() {
  return state.fullscreenIcon
      = document.fullscreenElement !== null
      ? markRaw(FullscreenExitOutlined)
      : markRaw(FullscreenOutlined)
}

// 监听全屏切换事件
document.addEventListener('fullscreenchange', toggleFullscreenIcon)

// 全屏切换
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  }
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const globalSearchShow = ref(false)

// 图标列表
const iconList = [
  {
    icon: SearchOutlined,
    tips: '搜索',
    eventObject: {
      click: () => {
        globalSearchShow.value = true
      },
    },
  },
  {
    icon: GithubOutlined,
    tips: 'github',
    eventObject: {
      click: () => window.open(websiteConfig.githubRepo),
    },
  },
  {
    icon: LockOutlined,
    tips: '锁屏',
    eventObject: {
      click: () => useLockscreen.setLock(true),
    },
  },
]

const avatarOptions = [
  {
    label: '个人设置',
    key: 1,
  },
  {
    label: '退出登录',
    key: 2,
  },
]

// 头像下拉菜单
function avatarSelect(key: any) {
  switch (key) {
    case 1:
      router.push({ name: 'Setting' })
      break
    case 2:
      doLogout()
      break
  }
}

function openSetting() {
  const { openDrawer } = drawerSetting.value
  openDrawer()
}

const keys = useMagicKeys()

const ctrlK = keys['ctrl + k']
const cmdK = keys['cmd + k']

whenever(logicOr(ctrlK, cmdK), (v) => {
  if (v) {
    globalSearchShow.value = !globalSearchShow.value
  }
})
</script>

<template>
  <div class="layout-header">
    <!-- 顶部菜单 -->
    <div
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
      class="layout-header-left"
    >
      <div v-if="navMode === 'horizontal'" class="logo">
        <img :src="websiteConfig.logo" alt="">
      </div>
      <AsideMenu
        v-model:collapsed="collapsed"
        :location="getMenuLocation"
        :inverted="getInverted"
        mode="horizontal"
      />
    </div>
    <!-- 左侧菜单 -->
    <div v-else class="layout-header-left">
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="collapsed = !collapsed"
      >
        <n-icon v-if="collapsed" size="18">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon v-else size="18">
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        v-if="headerSetting.isReload"
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="item in breadcrumbList" :key="item.key">
          <n-breadcrumb-item v-if="item.label">
            <n-dropdown
              v-if="item.children?.length"
              :options="item.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component :is="item.icon" v-if="crumbsSetting.showIcon && item.icon" />
                {{ item.label }}
              </span>
            </n-dropdown>
            <span v-else class="link-text">
              <component :is="item.icon" v-if="crumbsSetting.showIcon && item.icon" />
              {{ item.label }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <div
        v-for="item in iconList"
        :key="item.tips"
        class="layout-header-trigger layout-header-trigger-min"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!-- 切换全屏 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!-- 设置 -->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <!-- 项目配置 -->
  <ProjectSetting ref="drawerSetting" />
</template>

<style lang="scss" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: 64px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: #515a6e;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }

  //::v-deep(.menu-router-link) {
  //  color: #515a6e;
  //
  //  &:hover {
  //    color: #1890ff;
  //  }
  //}
</style>
