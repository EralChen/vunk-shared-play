import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createMarkdownPlugin } from '@vunk/shared/vite/markdown'


// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) =>{ 

  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_BASE_URL ?? '' + '/'

   return {
    base,
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      vueJsx(),
      await createMarkdownPlugin({
        base,
        demoContainerPluginSettings: {
          root: fileURLToPath(new URL('./src/demos', import.meta.url)),
          globSource: '**/*.vue',
        },
        sourceContainerPluginSettings: {
          root: fileURLToPath(new URL('./src', import.meta.url)),
        }
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
