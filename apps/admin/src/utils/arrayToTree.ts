import type { MenuOption } from 'naive-ui'
import { renderIcon } from '@/utils/renderIcon.ts'
import DashboardOutlined from '~icons/ant-design/DashboardOutlined'
import OptionsSharp from '~icons/ion/OptionsSharp'

interface Menu {
  id: number
  parentId: number
  title: string
  path: string
  icon: string
}

export const iconMap = new Map([
  ['dashboard', renderIcon(DashboardOutlined)],
  ['setting', renderIcon(OptionsSharp)],
])

export function arrayToMenuTree(data: Menu[]): MenuOption[] {
  const map = new Map<number, MenuOption>()
  data.forEach((item) => {
    map.set(item.id, {
      label: item.title,
      key: item.id,
      icon: iconMap.get(item.icon!),
    })
  })
  const result: MenuOption[] = []
  data.forEach((item) => {
    const parent = map.get(item.parentId!)
    if (parent) {
      parent.children = [...(parent.children || []), map.get(item.id)!]
    }
    else {
      result.push(map.get(item.id)!)
    }
  })
  return result
}

export function arrayToMap(data: Menu[]): Map<number, MenuOption> {
  const map = new Map<number, MenuOption>()
  data.forEach((item) => {
    map.set(item.id, {
      label: item.title,
      key: item.id,
      path: item.path,
      icon: iconMap.get(item.icon!),
    })
  })
  data.forEach((item) => {
    const parent = map.get(item.parentId!)
    if (parent) {
      parent.children = [...(parent.children || []), map.get(item.id)!]
    }
  })
  return map
}
