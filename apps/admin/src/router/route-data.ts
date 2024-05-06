import type { RouteData } from '@/store'

export const routeData: RouteData[] = [
  {
    title: '登录',
    path: 'login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    layout: 'blank',
    white: true,
  },
]
