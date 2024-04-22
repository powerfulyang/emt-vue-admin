import { PageEnum } from '@/enums/pageEnum.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ErrorPage = () => import('@/views/exception/404.vue');

export const BASE_ROUTES_NAME = [PageEnum.ERROR_PAGE_NAME, PageEnum.REDIRECT_NAME];

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect/:path(.*)',
  name: PageEnum.REDIRECT_NAME,
  component: () => import('@/views/redirect/index.vue'),
};

// 404 on a page
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PageEnum.ERROR_PAGE_NAME,
  component: ErrorPage,
};

export const BaseRoute = [RedirectRoute, ErrorPageRoute];
