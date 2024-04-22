import { Layout } from '@/router/layout.ts';
import { BaseRoute } from '@/router/routes/app/base.ts';
import { MeetingRoutes } from '@/router/routes/app/meeting.ts';
import { SystemRoute } from '@/router/routes/app/system.ts';
import type { RouteRecordRaw } from 'vue-router';

export const AppRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [...BaseRoute, ...SystemRoute, ...MeetingRoutes],
  },
];
