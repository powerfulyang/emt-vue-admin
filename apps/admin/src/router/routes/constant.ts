import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum.ts'

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
}

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: PageEnum.BASE_HOME_REDIRECT,
}

export const constant: RouteRecordRaw[] = [RootRoute, LoginRoute]
