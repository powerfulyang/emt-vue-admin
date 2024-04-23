<script lang="ts" setup>
import { useProjectSetting } from '@/hooks/useProjectSetting.ts'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { arrayToMenuTree } from '@/utils/arrayToTree.ts'

defineOptions({
  name: 'AsideMenu',
})

const props = defineProps({
  mode: {
    // 菜单模式
    type: String as PropType<('vertical' | 'horizontal')>,
    default: 'vertical',
  },
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
  },
  // 位置
  location: {
    type: String,
    default: 'left',
  },
})

const emit = defineEmits(['update:collapsed', 'clickMenuItem'])

const currentRoute = useRoute()
const router = useRouter()
const asyncRouteStore = useAsyncRouteStore()
const settingStore = useProjectSettingStore()
const selectedKeys = computed(() => {
  return asyncRouteStore.getMenuKey(currentRoute.path)
})
const headerMenuSelectKey = ref<string>('')

const { navMode } = useProjectSetting()

const openKeys = ref<(number | string)[]>([])

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(settingStore.navTheme)
})

const getSelectedKeys = computed(() => {
  const location = props.location
  return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
    ? unref(selectedKeys)
    : unref(headerMenuSelectKey)
})

watchEffect(() => {
  const matched = currentRoute.matched
  openKeys.value = matched?.length
    ? matched.map((item) => {
      return asyncRouteStore.getMenuKey(item.path)!
    })
    : []
})

const menus = computed(() => {
  if (!settingStore.menuSetting.mixMenu) {
    return arrayToMenuTree(asyncRouteStore.menus)
  }
  else {
    // 混合菜单
    return []
  }
})

// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  }
  else {
    // search menu from asyncRouteStore
    const route = asyncRouteStore.getMenu(key)
    router.push(route!.path)
  }
  emit('clickMenuItem', key)
}
</script>

<template>
  <n-menu
    :options="menus"
    :inverted="inverted"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update-expanded-keys="openKeys = $event"
    @update:value="clickMenuItem"
  />
</template>
