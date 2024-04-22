import type { DefineComponent } from 'vue';

export type Component<T = any> =
  | DefineComponent<{}, {}, any>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export const autoImportRoutes = async () => {
  const modules = import.meta.glob('../views/**/*.{vue,tsx}');
  // 自动注册路由
  const routes = [];
  for (const path in modules) {
    let name = path.match(/\.\/views(.*)\.(vue|tsx)$/)?.[1];
    const component = (await modules[path]?.()) as { default: Component };
    // 如果文件名是index，则直接使用父级路径
    if (name?.endsWith('/index')) {
      name = name.replace(/\/index$/, '');
    }
    routes.push({
      path: name,
      component: component.default,
    });
  }
  return routes;
};
