import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { type Lang, messages } from './lang'
import { localStg } from '@/utils'

const locale: Lang = localStg.get('lang') ?? 'zhCN'
const fallbackLocale: Lang = 'enUS'

export const i18n = createI18n({
  locale,
  fallbackLocale,
  messages: { ...messages },
  legacy: false,
})

export function setupI18n(app: App) {
  app.use(i18n)
  window.$tt = i18n.global.t
  app.config.globalProperties.$tt = i18n.global.t
}

const $translate = i18n.global.t

export type Translate = typeof $translate

export function setLocale(locale: Lang) {
  i18n.global.locale.value = locale
}

export * from './lang'
