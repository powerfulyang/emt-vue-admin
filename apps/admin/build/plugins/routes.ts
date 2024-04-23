import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'

export function RoutesPlugin() {
  return [
    VueRouter({
      root: '.',
      // Add your own custom pages here. Just add it to the array. Example: 'src/welcome/pages'
      routesFolder: [
        {
          src: 'src/views',
          path: '/',
        },
      ],
      dts: 'src/auto-typings/typed-router.d.ts',
      extensions: ['.vue'],
      exclude: ['**/components/**'],
    }),
    Layouts({
      layoutsDirs: 'src/layout',
      pagesDirs: [
        'src/views',
      ],
      defaultLayout: 'app-layout',
    }),
  ]
}
