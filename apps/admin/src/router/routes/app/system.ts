import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/menu',
    children: [
      {
        path: 'menu',
        name: 'system-menu',
        component: () => import('@/views/system/menu/index.vue'),
      },
      {
        path: 'role',
        name: 'system-role',
        component: () => import('@/views/system/menu/index.vue'),
      },
    ],
  },
];

export const SystemRoute = routes;
