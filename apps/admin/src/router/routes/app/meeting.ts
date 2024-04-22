import { Layout } from '@/router/layout.ts';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/meeting',
    redirect: '/meeting/summary',
    children: [
      {
        path: '/meeting/summary',
        name: 'meeting-summary',
        component: () => import('@/views/meeting/summary/index.vue'),
      },
    ],
  },
  {
    path: '/document',
    component: Layout,
    redirect: '/document/explain',
    children: [
      {
        path: '/document/explain',
        name: 'document-explain',
        component: () => import('@/views/document/explain.vue'),
      },
    ],
  },
  {
    path: '/transcribe-audio',
    name: 'transcribe-audio',
    component: () => import('@/views/transcribe-audio.vue'),
  },
];

export const MeetingRoutes: RouteRecordRaw[] = routes;
