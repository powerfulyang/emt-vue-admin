import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { type Lang, messages } from './lang'

const locale: Lang = localStorage.getItem('lang') ?? 'zhCN'
const fallbackLocale: Lang = 'enUS'

const i18n = createI18n({
  locale,
  fallbackLocale,
  messages: { ...messages },
  legacy: false,
})

export function setupI18n(app: App) {
  app.use(i18n)
  window.$translate = i18n.global.t
  app.config.globalProperties.$translate = i18n.global.t
}

export const $translate = i18n.global.t

export function setLocale(locale: Lang) {
  i18n.global.locale.value = locale
}

export * from './lang'
