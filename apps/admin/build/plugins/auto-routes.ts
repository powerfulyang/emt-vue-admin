import VueRouter from 'unplugin-vue-router/vite'

export function AutoRoutesPlugin() {
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
    // 会导致 HMR 无法正常工作
    // Layouts({
    //   layoutsDirs: 'src/layout',
    //   pagesDirs: [
    //     'src/views',
    //   ],
    // }),
  ]
}
