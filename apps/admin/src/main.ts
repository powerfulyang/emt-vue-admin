import { setupDirectives } from '@/directives';
import { setupNaiveDiscreteApi } from '@/plugins/naiveDiscreteApi.ts';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute.ts';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import '@/styles/index.scss';
import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  app.use(VueQueryPlugin);

  // 挂载状态管理
  setupStore(app);

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app);

  setupNaiveDiscreteApi();

  // 挂载路由
  setupRouter(app);

  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();

  await useAsyncRouteStore().fetchMenus();

  // https://www.naiveui.com/en-US/os-theme/docs/style-conflict#About-Tailwind's-Preflight-Style-Override
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);

  app.mount('#app', true);
}

void bootstrap();
