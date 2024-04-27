import Icons from 'unplugin-icons/vite'

export function IconPlugin() {
  return [
    Icons({
      compiler: 'vue3',
      scale: 1.5,
    }),
  ]
}
