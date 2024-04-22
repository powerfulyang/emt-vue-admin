import { createHtmlPlugin } from 'vite-plugin-html'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import { VuePlugin } from './plugins/vue'
import { UnoCSSPlugin } from './plugins/unocss'
import { RoutesPlugin } from './plugins/routes'
import { IconsPlugin } from './plugins/icons'
import { AutoImportPlugin } from './plugins/auto-import'

export function createVitePlugins(isBuild: boolean) {
  return [
    ...AutoImportPlugin(),
    ...IconsPlugin(),
    ...RoutesPlugin(),
    ...UnoCSSPlugin(),
    ...VuePlugin(),
    nodePolyfill(),
    createHtmlPlugin({
      minify: isBuild,
      inject: {
        // Inject data into ejs template
        data: {
          title: '中央管理系统',
        },
        // Embed the generated app.config.js file
        tags: isBuild
          ? [
              {
                tag: 'script',
                attrs: {
                  src: '/hello.js',
                  type: 'module',
                },
              },
            ]
          : [],
      },
    }),
  ]
}
