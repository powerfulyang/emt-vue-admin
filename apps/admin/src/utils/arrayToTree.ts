import { renderIcon } from '@/utils/renderIcon.ts';
import type { Menu } from '@powerfulyang/server';
import { DashboardOutlined } from '@vicons/antd';
import { OptionsSharp } from '@vicons/ionicons5';
import type { MenuOption } from 'naive-ui';

export const iconMap = new Map([
  ['dashboard', renderIcon(DashboardOutlined)],
  ['setting', renderIcon(OptionsSharp)],
]);

export const arrayToMenuTree = (data: Menu[]): MenuOption[] => {
  const map = new Map<number, MenuOption>();
  data.forEach((item) => {
    map.set(item.id, {
      label: item.title,
      key: item.id,
      icon: iconMap.get(item.icon!),
    });
  });
  const result: MenuOption[] = [];
  data.forEach((item) => {
    const parent = map.get(item.parentId!);
    if (parent) {
      parent.children = [...(parent.children || []), map.get(item.id)!];
    } else {
      result.push(map.get(item.id)!);
    }
  });
  return result;
};

export const arrayToMap = (data: Menu[]): Map<number, MenuOption> => {
  const map = new Map<number, MenuOption>();
  data.forEach((item) => {
    map.set(item.id, {
      label: item.title,
      key: item.id,
      path: item.path,
      icon: iconMap.get(item.icon!),
    });
  });
  data.forEach((item) => {
    const parent = map.get(item.parentId!);
    if (parent) {
      parent.children = [...(parent.children || []), map.get(item.id)!];
    }
  });
  return map;
};
