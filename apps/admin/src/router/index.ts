import routes from '@/router/routes';
import { createRouterGuards } from '@/router/guards.ts';
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);

  createRouterGuards(router);
}

export default router;
