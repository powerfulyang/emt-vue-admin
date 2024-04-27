import type { RouteRecordRaw } from 'vue-router'
import { AppRoutes } from '@/router/routes/app'
import { constant } from '@/router/routes/constant.ts'

const routes: RouteRecordRaw[] = [...constant, ...AppRoutes]

export default routes
