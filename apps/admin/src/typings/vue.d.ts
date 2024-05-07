import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: typeof import('@/locales').$t
  }
}
