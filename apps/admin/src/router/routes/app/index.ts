import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/app-layout.vue'
import { BaseRoute } from '@/router/routes/app/base.ts'
import { SystemRoute } from '@/router/routes/app/system.ts'

export const AppRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [...BaseRoute, ...SystemRoute],
  },
]
