import { createWorker } from '@root/mocks/start.ts'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from '@/locales'
import { useUserStore } from '@/store/modules/user.ts'
import { setupDirectives } from '@/directives'
import { setupAssets, setupNaiveDiscreteApi } from '@/plugins'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

async function bootstrap() {
  await createWorker()
  const app = createApp(App)

  // vue-query
  app.use(VueQueryPlugin)

  // 挂载状态管理
  setupStore(app)

  await useUserStore().fetchUserInfo()

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app)

  setupNaiveDiscreteApi()
  setupAssets()

  // 挂载路由
  await setupRouter(app)

  // i18n
  setupI18n(app)

  app.mount('#app', true)
}

void bootstrap()
