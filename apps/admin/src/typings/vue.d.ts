import type { Translate } from '@/locales'

export {}

declare module 'vue' {

  export interface ComponentCustomProperties {
    $tt: Translate
  }
}
