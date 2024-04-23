import { createHtmlPlugin } from 'vite-plugin-html'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import { IconsPlugin } from './icons'
import { RoutesPlugin } from './routes'
import { UnoCSSPlugin } from './unocss'
import { AutoImportPlugin } from './auto-import'
import { VuePlugin } from './vue'

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
