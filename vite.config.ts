import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import md from 'unplugin-vue-markdown/vite'
import { sourceContainerPlugin, SourceContainerPluginSettings } from '@vunk/shared/markdown/plugins'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/test/',
  plugins: [
   
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    md({
      markdownItSetup (mdit) {
        mdit.use(sourceContainerPlugin, {
          root: path.resolve(__dirname, 'src'),
          extnames: ['.vue']
        } as SourceContainerPluginSettings)
      },
    }),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
