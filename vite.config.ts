import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import md from 'unplugin-vue-markdown/vite'
import { customContainerPlugin } from '@vunk/shared/markdown/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    md({
      markdownItSetup (mdit) {
        const containers = ['tip', 'warning', 'danger', 'info']
        containers.forEach(klass => {
          mdit.use(customContainerPlugin, klass)
        })
      },
      wrapperClasses: [
        'vp-doc'
      ]
    }),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
