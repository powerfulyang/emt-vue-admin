import { resolve } from 'node:path'
import process from 'node:process'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { createVitePlugins } from './build'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
function generateConfig({ command }: ConfigEnv): UserConfig {
  const isBuild = command === 'build'

  return defineConfig({
    plugins: createVitePlugins(isBuild),
    optimizeDeps: {
      // 已经是生产环境了，不需要再优化
      exclude: ['docx-templates'],
    },
    resolve: {
      dedupe: ['vue'],
      alias: [
        {
          find: '@',
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },
    server: {
      proxy: {
        '/trpc': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  })
}

export default generateConfig
