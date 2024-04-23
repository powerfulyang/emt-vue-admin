import type { RouteLocationRaw, Router } from 'vue-router'

import { useRouter } from 'vue-router'
import { unref } from 'vue'
import { PageEnum } from '@/enums/pageEnum.ts'

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }

function handleError(e: Error) {
  console.error(e)
}

/**
 * 页面切换
 */
export function useGo(_router?: Router) {
  const router = _router || useRouter()
  const { push, replace } = router
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    if (typeof opt === 'string') {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    }
    else {
      const o = opt as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}

/**
 * 重做当前页面
 */
export function useRedo(_router?: Router) {
  const { push, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === 'redirect') {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        params._redirect_type = 'name'
        params.path = String(name)
      }
      else {
        params._redirect_type = 'path'
        params.path = fullPath
      }
      push({ name: 'redirect', params, query }).then(() => resolve(true))
    })
  }
  return redo
}
