import type { RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/store/modules/user.ts'
import { INVALID_CODE, type RequestError } from '@/utils'
import { useAuthStore, useRouteStore } from '@/store'

export async function createPermissionGuard(to: RouteLocationNormalized) {
  const authStore = useAuthStore()
  const routeStore = useRouteStore()

  const userStore = useUserStore()
  if (userStore.userInfo) {
    if (to.name === 'Login') {
      return { name: 'Root' }
    }
    else {
      if (!routeStore.isInit) {
        try {
          await routeStore.init()
          const { path, query, hash } = to
          return { path, query, hash, replace: true }
        }
        catch (e) {
          if ([...INVALID_CODE, 401].includes((e as RequestError).code)) {
            return true
          }
          console.warn(e)
          authStore.reset()
          const redirect = to.fullPath
          return { name: 'Login', query: { redirect } }
        }
      }
      else {
        return true
      }
    }
  }
  else {
    if (to.meta.white) {
      return true
    }
    else {
      const redirect = to.fullPath
      return { name: 'Login', query: { redirect } }
    }
  }
}
