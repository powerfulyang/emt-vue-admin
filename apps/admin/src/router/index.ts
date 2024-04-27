import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from '@/router/layout.ts'
import { createRouterGuards } from '@/router/guards.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    return setupLayouts(routes)
  },
})

export function setupRouter(app: App) {
  app.use(router)

  createRouterGuards(router)
}

export default router
