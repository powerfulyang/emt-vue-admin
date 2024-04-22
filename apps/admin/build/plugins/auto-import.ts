import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export function AutoImportPlugin() {
  return [
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        'vue/macros',
        '@vueuse/core',
      ],
      dts: 'src/auto-typings/auto-imports.d.ts',
      dirs: ['src/composables'],
    }),
    Components({
      dirs: [
        'src/components',
        'src/layout',
        'src/application',
      ],
      dts: 'src/auto-typings/components.d.ts',
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: 'i',
        }),
        NaiveUiResolver(),
      ],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),
  ]
}
