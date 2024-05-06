import { createHtmlPlugin } from 'vite-plugin-html'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import { IconPlugin } from './icon-plugin'
import { AutoRoutesPlugin } from './auto-routes'
import { UnoPlugin } from './uno-plugin'
import { VuePlugin } from './vue-plugin'
import { AutoImportPlugin } from './auto-import'

export function createVitePlugins(isBuild: boolean) {
  return [
    ...AutoImportPlugin(),
    ...IconPlugin(),
    ...AutoRoutesPlugin(),
    ...UnoPlugin(),
    ...VuePlugin(),
    nodePolyfill(),
    createHtmlPlugin({
      minify: isBuild,
      inject: {
        // Inject data into ejs template
        data: {
          // title: '中央管理系统',
          title: 'Loading...',
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
