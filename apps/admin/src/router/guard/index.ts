import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { createPermissionGuard } from './permission'
import { websiteConfig } from '@/config/website.config.ts'

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    window.$loadingBar.start()
    return await createPermissionGuard(to)
  })
  router.afterEach((to) => {
    const title = computed(() => {
      return `${$tt(to.meta.title as string)} - ${websiteConfig.siteName}`
    })
    useTitle(title)
    window.$loadingBar.finish()
  })
}
