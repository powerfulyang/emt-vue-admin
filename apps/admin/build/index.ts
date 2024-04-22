import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import UnoCSS from 'unocss/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Layouts from 'vite-plugin-vue-layouts'

export function createVitePlugins(isBuild: boolean) {
  return [
    nodePolyfill(),
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', VueRouterAutoImports, 'vue/macros', '@vueuse/core'],
      dts: 'src/auto-typings/auto-imports.d.ts',
      dirs: ['src/composables'],
    }),
    Components({
      dirs: ['src/components', 'src/layout', 'src/application'],
      dts: 'src/auto-typings/components.d.ts',
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: 'i',
        }),
        NaiveUiResolver(),
      ],
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
    }),
    VueRouter({
      root: '.',
      // Add your own custom pages here. Just add it to the array. Example: 'src/welcome/pages'
      routesFolder: [
        { src: 'src/views', path: '/' },
      ],
      dts: 'src/auto-typings/typed-router.d.ts',
      extensions: ['.vue'],
    }),
    Layouts({
      layoutsDirs: 'src/layout',
      pagesDirs: [
        'src/views',
      ],
      defaultLayout: 'default',
    }),
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
