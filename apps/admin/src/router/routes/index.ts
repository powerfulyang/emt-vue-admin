import { AppRoutes } from '@/router/routes/app';
import { constant } from '@/router/routes/constant.ts';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [...constant, ...AppRoutes];

export default routes;
