import type { RouteRecordRaw } from 'vue-router'

export const AppLayout = () => import('@/layout/app-layout.vue')
const DefaultLayout = () => import('@/layout/default-layout.vue')

const layouts = {
  'app-layout': AppLayout,
  'default': DefaultLayout,
}

export function setupLayouts(routes: RouteRecordRaw[]) {
  function deepSetupLayout(routes: RouteRecordRaw[], top = true) {
    return routes.map((route) => {
      const layout = layouts[route.meta?.layout as string || 'default']
      if (route.children?.length) {
        route.children = deepSetupLayout(route.children, false)
      }

      if (top) {
        // unplugin-vue-router adds a top-level route to the routing group, which we should skip.
        const skipLayout = !route.component && route.children?.find(r => (r.path === '' || r.path === '/') && r.meta?.isLayout)

        if (skipLayout) {
          return route
        }

        if (route.meta?.layout !== false) {
          return {
            path: route.path,
            component: layout,
            children: route.path === '/' ? [route] : [{ ...route, path: '' }],
            meta: {
              isLayout: true,
            },
          }
        }
      }

      if (route.meta?.layout) {
        return {
          path: route.path,
          component: layout,
          children: [{ ...route, path: '' }],
          meta: {
            isLayout: true,
          },
        }
      }

      return route
    })
  }

  return deepSetupLayout(routes)
}
