import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function VuePlugin() {
  return [
    vue(),
    vueJsx(),
  ]
}
